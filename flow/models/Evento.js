import mongoose from 'mongoose';

const EventoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    dataInicio: {
        type: Date,
        required: true
    },
    capacidade: {
        type: Number,
        required: true
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

const Evento = mongoose.models.Evento || mongoose.model('Evento', EventoSchema);

export default Evento;
