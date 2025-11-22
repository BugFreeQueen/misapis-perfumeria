import Ejemplo from '../models/ejemplo.model.js';
import mongoose from 'mongoose';

export const getAllEjemplos = async (req, res) => {
  try {
    const lista = await Ejemplo.find({}, { __v: 0 });
    if (lista.length === 0) return res.status(404).json({ mensaje: 'No se encontraron registros' });
    return res.status(200).json({ lista });
  } catch (err) {
    return res.status(500).json({ mensaje: 'Error al consultar registros' });
  }
};

export const getEjemploById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ mensaje: 'ID inválido' });

  try {
    const registro = await Ejemplo.findById(id);
    if (!registro) return res.status(404).json({ mensaje: 'Registro no encontrado' });
    return res.status(200).json({ registro });
  } catch (err) {
    return res.status(500).json({ mensaje: 'Error al obtener el registro' });
  }
};

export const postEjemplo = async (req, res) => {
  const nuevo = new Ejemplo(req.body);
  const errores = nuevo.validateSync();
  if (errores) {
    const mensajes = Object.values(errores.errors).map(e => e.message);
    return res.status(400).json({ mensajes });
  }

  try {
    await nuevo.save();
    return res.status(201).json({ registro: nuevo });
  } catch (err) {
    return res.status(500).json({ mensaje: 'No se pudo guardar el registro' });
  }
};

export const putEjemplo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ mensaje: 'ID inválido' });

  try {
    const actualizado = await Ejemplo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Registro no encontrado' });
    return res.status(200).json({ registro: actualizado });
  } catch (err) {
    return res.status(500).json({ mensaje: 'Error al actualizar el registro' });
  }
};

export const deleteEjemplo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ mensaje: 'ID inválido' });

  try {
    const eliminado = await Ejemplo.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Registro no encontrado' });
    return res.status(200).json({ mensaje: 'Registro eliminado', registro: eliminado });
  } catch (err) {
    return res.status(500).json({ mensaje: 'Error al eliminar el registro' });
  }
};