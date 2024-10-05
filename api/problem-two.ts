import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const pairs: string[][] = req.body;

    // Aquí puedes manejar los datos recibidos
    console.log('Received pairs:', pairs);

    res.status(200).json({ message: 'Datos recibidos correctamente' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}