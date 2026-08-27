const PROD = 'https://flyuhouse-sistem.vercel.app';

module.exports = async (req, res) => {
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString();
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString();
  const origin = host.includes('localhost') ? `${proto}://${host}` : PROD;
  const dest = `${origin}/?rental=1`;
  const img = `${origin}/api/og?pres=rental`;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>FLYHOUSE Rental · Herramientas para tu obra</title>
  <meta name="description" content="Alquila equipos profesionales. Reserva en un toque.">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="FLYHOUSE">
  <meta property="og:title" content="FLYHOUSE Rental · Herramientas para tu obra">
  <meta property="og:description" content="Catálogo de equipos para alquilar. Entra, elige y reserva.">
  <meta property="og:image" content="${img}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta http-equiv="refresh" content="0;url=${dest}">
</head>
<body style="margin:0;background:#0a0a0b;color:#D4AF37;font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh">
  <p>ABRIENDO RENTAL…</p>
  <script>location.replace(${JSON.stringify(dest)});</script>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
};
