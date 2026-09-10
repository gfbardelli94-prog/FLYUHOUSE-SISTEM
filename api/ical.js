module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const url = String((req.query && req.query.url) || '').trim();
  if (!url || !/^https?:\/\//i.test(url)) {
    return res.status(400).json({ ok: false, error: 'url inválida' });
  }
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'FLYHOUSE-Life/1.0' } });
    const text = await r.text();
    return res.status(200).json({ ok: true, ics: text });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'No se pudo leer el calendario' });
  }
};
