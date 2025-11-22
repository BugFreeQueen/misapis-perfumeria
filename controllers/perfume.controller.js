import Perfume from "../models/perfume.model.js";

// Obtener todos
export const getPerfumes = async (req, res) => {
  try {
    const data = await Perfume.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener perfumes", error: err.message });
  }
};

// Obtener por ID
export const getPerfumeById = async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) return res.status(404).json({ msg: "No encontrado" });
    res.json(perfume);
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};

// Crear
export const postPerfume = async (req, res) => {
  try {
    const nuevo = new Perfume(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ msg: "Error al crear perfume", error: err.message });
  }
};

// Editar
export const putPerfume = async (req, res) => {
  try {
    const actualizado = await Perfume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar", error: err.message });
  }
};

// Eliminar
export const deletePerfume = async (req, res) => {
  try {
    await Perfume.findByIdAndDelete(req.params.id);
    res.json({ msg: "Perfume eliminado" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar", error: err.message });
  }
};