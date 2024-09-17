// pages/api/auth/user.js

import User from '@/models/User';
import connectMongo from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        res.status(500).json({ message: 'Erro ao obter dados do usuário' });
    }
}
