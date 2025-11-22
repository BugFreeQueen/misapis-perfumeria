import mongoose from 'mongoose';

const esquemaEjemplo = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
  apellido: { type: String, required: [true, 'El apellido es obligatorio'] },
  edad: { type: Number },
  contactos: { type: [String], default: [] }
}, {
  timestamps: true
});

const ModeloEjemplo = mongoose.model('Ejemplo', esquemaEjemplo);

export default ModeloEjemplo;