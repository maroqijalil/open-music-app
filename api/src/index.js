import {config} from 'dotenv';
import initDatabase from './core/db/db.js';
import createServer from './core/server/server.js';
import initBroker from './core/broker/broker.js';
import * as path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const start = async () => {
  config();

  const publicPath = path.resolve(__dirname, 'public');
  const database = initDatabase();
  const broker = initBroker();

  const server = await createServer(database, broker, publicPath);
  await server.start();
};

start();
