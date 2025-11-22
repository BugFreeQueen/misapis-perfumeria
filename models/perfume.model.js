import mongoose from "mongoose";

const perfumeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  tipo: { 
    type: String, 
    enum: ["Feromona", "Aceite Esencial", "Extracto", "Eau de Parfum", "Eau de Toilette"], 
    default: "Feromona" 
  },
  intensidad: { 
    type: Number, 
    required: true,
    min: 1,
    max: 10
  },
  duracionHoras: { type: Number, required: true },
  notas: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

export default mongoose.model("Perfume", perfumeSchema);