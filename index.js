export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ result: 'Error', message: 'Method not allowed' });
  }

  try {
    const googleResponse = await fetch("https://script.google.com/macros/s/AKfycbwuR_ZGAcq04GRLUELxJiSeXRoLx8Kcx-W9RiPI8n6DZiQl8BxQKNExK1cpjy-Y1Oo/exec", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await googleResponse.text();

    try {
      const json = JSON.parse(text);
      res.status(200).json(json);
    } catch {
      res.status(500).json({ result: 'Error', message: 'Google returned invalid or HTML response.' });
    }
  } catch (err) {
    res.status(500).json({ result: 'Error', message: err.message });
  }
}
