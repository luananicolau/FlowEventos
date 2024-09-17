import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Ajuste conforme a estrutura de pastas
import connectMongo from '@/utils/dbConnect'; // Ajuste conforme a estrutura de pastas

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  await connectMongo(); // Conecta ao MongoDB

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verifique a senha. Em produção, use um método seguro como bcrypt.
    if (user.password !== password) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET, // Use a variável de ambiente para o segredo
      { expiresIn: '1h' }
    );

    // Retorna o token e o papel do usuário
    res.status(200).json({ message: 'Login bem-sucedido', token, role: user.role });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno ao fazer login' });
  }
}
