
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombreIndicador: {
        type: String,
        required: true
    },
    codigoIndicador: {
        type: String,
        required: true
    },
    unidadMedidaIndicador: {
        type: String,
        required: true
    },
    valorIndicador: {
        type: Number,
        required: true
    },
    fechaIndicador: {
        type: Date,
        required: true
    },
    tiempoIndicador: {
        type: String,
        required: false
    },
    origenIndicador: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Model = mongoose.model('Model', schema);

export default Model;


