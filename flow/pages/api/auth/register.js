// pages/api/auth/register.js

import User from '@/models/User';
import connectMongo from '@/utils/dbConnect';

export default async function handler(req, res) {
    await connectMongo();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar o usuário' });
    }
}
