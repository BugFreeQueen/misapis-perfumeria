// db/cnn_mongodb.js
import mongoose from 'mongoose';
import colors from 'colors';
import 'dotenv/config'; 

let conectado = false;

export const conectarAMongoDB = async () => {
  if (conectado) {
    console.log('MongoDB ya está conectado ✅'.green);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    conectado = true;
    console.log('Conexión exitosa a MongoDB 🌐'.green);
  } catch (err) {
    conectado = false;
    console.log('❌ Error al conectar a MongoDB'.red);
    console.error(err);
  }
};

export const estadoConexion = () => conectado;

const conexion = mongoose.connection;

conexion.on('error', (err) => {
  conectado = false;
  console.log('⚠️ Error en la conexión con MongoDB'.red);
  console.error(err);
});

conexion.once('open', () => {
  conectado = true;
  console.log('🟢 Base de datos lista para usarse'.green);
});

conexion.on('disconnected', () => {
  conectado = false;
  console.log('🟡 MongoDB se ha desconectado'.yellow);
});

process.on('SIGINT', async () => {
  console.log('🛑 Cerrando conexión con MongoDB...'.yellow);
  await conexion.close();
  conectado = false;
  console.log('✅ Conexión cerrada correctamente'.yellow);
  process.exit(0);
});
