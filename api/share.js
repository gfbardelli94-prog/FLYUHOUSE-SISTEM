const SB_URL = 'https://zzyadghmqqokxchngltw.supabase.co';
const SB_KEY = 'sb_publishable_AMxXlzxoO2sVyaVfsns0VQ_Q49mRMW_';
const PROD = 'https://flyuhouse-sistem.vercel.app';

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

module.exports = async (req, res) => {
  const token = String(req.query.pres || req.query.pack || '').trim();
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString();
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString();
  const origin = host.includes('localhost') ? `${proto}://${host}` : PROD;

  let title = 'FLYHOUSE · Propuesta para tu espacio';
  let desc = 'Mira cómo quedaría tu proyecto. Entra y descubre la propuesta.';
  let hasImg = false;

  try {
    const r = await fetch(`${SB_URL}/rest/v1/system_data?id=eq.main&select=payload`, {
      headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }
    });
    const rows = await r.json();
    const data = (rows && rows[0] && rows[0].payload && rows[0].payload.data) || {};
    const p = (data.presupuestos || []).find(x => String(x.token) === token || String(x.id) === token);
    const pack = (data.packs || []).find(x => String(x.token) === token || String(x.id) === token);
    if (p) {
      title = 'FLYHOUSE · ' + (p.titulo || 'Propuesta');
      desc = [p.cliente, p.lugar].filter(Boolean).join(' · ') || desc;
      hasImg = !!(p.fotoDespues || p.fotoAntes);
    } else if (pack) {
      title = 'FLYHOUSE · ' + (pack.titulo || 'Pack de propuestas');
      desc = pack.cliente || desc;
    }
  } catch (e) {}

  const img = `${origin}/api/og?pres=${encodeURIComponent(token)}`;
  const dest = `${origin}/?pres=${encodeURIComponent(token)}`;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="FLYHOUSE">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${esc(img)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${esc(img)}">
  <meta http-equiv="refresh" content="0;url=${esc(dest)}">
  <link rel="canonical" href="${esc(dest)}">
</head>
<body style="margin:0;background:#0a0a0b;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh">
  <p style="color:#D4AF37;letter-spacing:.2em;font-size:12px">ABRIENDO PROPUESTA…</p>
  <script>location.replace(${JSON.stringify(dest)});</script>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.status(200).send(html);
};
