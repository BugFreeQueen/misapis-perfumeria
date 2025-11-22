import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.generalRoute = '/api';
    this.conectarDBMongo();

    this.middlewares();
    this.routes();
  }

  async conectarDBMongo() {
    try {
      await db.conectarAMongoDB();
      console.log('🔥 MongoDB conectado correctamente');
    } catch (err) {
      console.error('❌ Error al conectar a MongoDB:', err);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    // 🟩 Servir todo lo que esté en public/ automáticamente
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.generalRoute, indexRoutes);

    // ⛔ Manejo de rutas no encontradas
    this.app.use((req, res) => {
      res.status(404).json({ msg: 'Ruta no encontrada ⚠️' });
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`🚀 Servidor corriendo en puerto ${this.port}`)
    );
  }
}