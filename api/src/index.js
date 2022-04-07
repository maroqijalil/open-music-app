import {config} from 'dotenv';
import initDatabase from './core/db/db.js';
import createServer from './core/server/server.js';
import initBroker from './core/broker/broker.js';
import * as path from 'path';

const start = async () => {
  config();

  const publicPath = path.resolve(__dirname, 'public');
  const database = initDatabase();
  const broker = initBroker();

  const server = await createServer(database, broker, publicPath);
  await server.start();
};

start();
