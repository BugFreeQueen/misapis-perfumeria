import 'dotenv/config';
import AppServer from './server/server.js';

const appServer = new AppServer();
appServer.listen();