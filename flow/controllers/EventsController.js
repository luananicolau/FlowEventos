import Event from "@/models/Event";
import connectMongo from "@/utils/dbConnect";

// Carregar eventos
export const getEvents = async (req, res) => {
    await connectMongo();
    try {
        const events = await Event.find({ userId: req.user.userId });
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao carregar eventos', error });
    }
};

// Criar evento
export const addEvent = async (req, res) => {
    const { title, description, startDate, capacity } = req.body;
    await connectMongo();
    try {
        const newEvent = new Event({
            title,
            description,
            startDate,
            capacity,
            userId: req.user.userId, // Associa o evento ao usuário logado
        });
        await newEvent.save();
        res.status(201).json({ event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar evento', error });
    }
};

// Atualizar evento
export const updateEvent = async (req, res) => {
    const { id } = req.query;
    const { title, description, startDate, capacity } = req.body;
    await connectMongo();
    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: id, userId: req.user.userId },
            { title, description, startDate, capacity },
            { new: true }
        );
        if (!updatedEvent) return res.status(404).json({ message: 'Evento não encontrado' });
        res.status(200).json({ event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar evento', error });
    }
};

// Deletar evento
export const deleteEvent = async (req, res) => {
    const { id } = req.query;
    await connectMongo();
    try {
        const deletedEvent = await Event.findOneAndDelete({
            _id: id, userId: req.user.userId
        });
        if (!deletedEvent) return res.status(404).json({ message: 'Evento não encontrado' });
        res.status(200).json({ message: 'Evento deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar evento', error });
    }
};
