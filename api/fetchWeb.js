export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const response = await fetch(target);
    const html = await response.text();
    res.status(200).json({
      url: target,
      length: html.length,
      snippet: html.slice(0, 1000) // 本文の最初だけ返す
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
