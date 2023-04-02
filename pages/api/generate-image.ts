import axios from 'axios';

export default async function handler(req: any, res: any) {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_IMAGE_GENERATION_API_KEY;
    const API_URL = 'https://api.openai.com/v1/images/generations';

    const { prompt } = req.body;

    const response = await axios.post(
      API_URL,
      { prompt },
      { headers: { 'Authorization': `Bearer ${API_KEY}` } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
