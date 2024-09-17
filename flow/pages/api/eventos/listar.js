import Evento from '@/models/Evento';
import { jwtMiddleware } from '@/utils/middleware';

const listarEventos = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const eventos = await Evento.find({ usuarioId: req.user.id });
            res.status(200).json(eventos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar eventos' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
};

export default jwtMiddleware(listarEventos);
