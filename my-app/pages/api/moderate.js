export default async function handler(req, res) {
    console.log('🔑 OPENAI_API_KEY:', process.env.OPENAI_API_KEY)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { content } = req.body
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.error('❌ Missing OpenAI API key')
    return res.status(500).json({ error: 'Missing OpenAI API key' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ input: content }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('❌ OpenAI API error:', result)
      return res.status(500).json({ error: 'OpenAI API error', detail: result })
    }

    res.status(200).json(result)
  } catch (err) {
    console.error('❌ Moderation API exception:', err)
    res.status(500).json({ error: 'Moderation request failed' })
  }
}