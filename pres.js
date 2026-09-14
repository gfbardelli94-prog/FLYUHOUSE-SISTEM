const SB_URL = 'https://zzyadghmqqokxchngltw.supabase.co';
const SB_KEY = 'sb_publishable_AMxXlzxoO2sVyaVfsns0VQ_Q49mRMW_';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  const token = String((req.query && (req.query.pres || req.query.token)) || '').trim();
  if (!token) {
    res.status(400).json({ ok: false, error: 'missing token' });
    return;
  }
  try {
    const r = await fetch(`${SB_URL}/rest/v1/system_data?id=eq.main&select=payload`, {
      headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }
    });
    const rows = await r.json();
    const data = (rows && rows[0] && rows[0].payload && rows[0].payload.data) || {};
    const lists = []
      .concat(data.presupuestos || [])
      .concat(data.presLinks || [])
      .concat(data.packs || []);
    const hit = lists.find(x => x && (String(x.token) === token || String(x.id) === token));
    if (!hit) {
      res.status(404).json({ ok: false, error: 'not found' });
      return;
    }
    res.status(200).json({ ok: true, item: hit, kind: hit.ids ? 'pack' : 'pres' });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e && e.message || e) });
  }
};
