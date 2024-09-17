import Evento from '@/models/Evento'; // Importa o modelo de evento
import connectMongo from '@/utils/dbConnect'; // Importa a função de conexão com o MongoDB
import { jwtMiddleware } from '@/utils/middleware'; // Importa o middleware JWT

const cadastrarEvento = async (req, res) => {
    if (req.method === 'POST') {
        const { titulo, descricao, dataInicio, capacidade } = req.body;
        const usuarioId = req.user.userId; // Obtém o ID do usuário do token

        if (!titulo || !descricao || !dataInicio || !capacidade) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        try {
            await connectMongo(); // Garante que a conexão com o MongoDB está estabelecida

            const evento = new Evento({
                userId: usuarioId, // Usa userId para coincidir com o modelo
                titulo,
                descricao,
                dataInicio,
                capacidade
            });

            await evento.save();
            res.status(201).json({ message: 'Evento cadastrado com sucesso' });
        } catch (error) {
            console.error('Erro ao cadastrar evento:', error);
            res.status(500).json({ message: 'Erro ao cadastrar evento' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
};

export default jwtMiddleware(cadastrarEvento);
