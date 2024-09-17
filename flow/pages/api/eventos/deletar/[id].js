import Evento from '@/models/Evento'; // Importa o modelo de evento
import connectMongo from '@/utils/dbConnect'; // Importa a função de conexão com o MongoDB
import { jwtMiddleware } from '@/utils/middleware'; // Importa o middleware JWT

const deletarEvento = async (req, res) => {
    if (req.method === 'DELETE') {
        const { id } = req.query;
        const usuarioId = req.user.userId; // Obtém o ID do usuário do token

        try {
            await connectMongo(); // Garante que a conexão com o MongoDB está estabelecida

            const evento = await Evento.findById(id);

            if (!evento) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }

            if (evento.userId.toString() !== usuarioId) {
                return res.status(403).json({ message: 'Não autorizado' });
            }

            await Evento.findByIdAndDelete(id);
            res.status(200).json({ message: 'Evento deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar evento:', error);
            res.status(500).json({ message: 'Erro ao deletar evento' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
};

export default jwtMiddleware(deletarEvento);
