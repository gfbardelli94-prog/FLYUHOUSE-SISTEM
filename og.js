const SB_URL = 'https://zzyadghmqqokxchngltw.supabase.co';
const SB_KEY = 'sb_publishable_AMxXlzxoO2sVyaVfsns0VQ_Q49mRMW_';

function defaultPng() {
  // 1x1 gold-ish png fallback (tiny); browsers/WA still show a card
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64'
  );
}

module.exports = async (req, res) => {
  const token = String(req.query.pres || '').trim();
  let buf = null;
  let mime = 'image/png';
  try {
    const r = await fetch(`${SB_URL}/rest/v1/system_data?id=eq.main&select=payload`, {
      headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }
    });
    const rows = await r.json();
    const data = (rows && rows[0] && rows[0].payload && rows[0].payload.data) || {};
    const p = (data.presupuestos || []).find(x => String(x.token) === token || String(x.id) === token);
    const raw = p && (p.fotoDespues || p.fotoAntes);
    if (raw && typeof raw === 'string' && raw.startsWith('data:')) {
      const m = raw.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (m) {
        mime = m[1];
        buf = Buffer.from(m[2], 'base64');
      }
    } else if (raw && typeof raw === 'string' && raw.startsWith('http')) {
      const img = await fetch(raw);
      const ab = await img.arrayBuffer();
      buf = Buffer.from(ab);
      mime = img.headers.get('content-type') || 'image/jpeg';
    }
  } catch (e) {}
  if (!buf || !buf.length) buf = defaultPng();
  res.setHeader('Content-Type', mime);
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(buf);
};
