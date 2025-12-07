import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const response = await fetch(target);
    const html = await response.text();
    const $ = cheerio.load(html);

    let content =
      $('article').text().trim() ||
      $('main').text().trim() ||
      $('body').text().trim();

    if (content.length > 5000) {
      content = content.slice(0, 5000) + '...';
    }

    res.status(200).json({
      url: target,
      length: content.length,
      text: content
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
