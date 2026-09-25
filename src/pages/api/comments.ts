import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url, locals }) => {
  const slug = url.searchParams.get('slug');
  if (!slug) return new Response('[]', { headers: { 'Content-Type': 'application/json' } });
  const db = (locals as any).runtime.env.DB;
  const { results } = await db
    .prepare('SELECT name, body, created_at FROM comments WHERE slug = ? AND approved = 1 ORDER BY created_at DESC')
    .bind(slug).all();
  return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const data = await request.json().catch(() => null);
  if (!data) return new Response(JSON.stringify({ error: 'Bad request' }), { status: 400 });
  const { slug, name, body, website } = data;
  if (website) return new Response(JSON.stringify({ ok: true }), { status: 200 });
  if (!slug || !name || !body || String(name).length > 80 || String(body).length > 2000) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
  }
  const db = (locals as any).runtime.env.DB;
  await db
    .prepare('INSERT INTO comments (slug, name, body, created_at, approved) VALUES (?, ?, ?, ?, 1)')
    .bind(slug, String(name).trim(), String(body).trim(), new Date().toISOString()).run();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
