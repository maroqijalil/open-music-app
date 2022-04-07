import {config} from 'dotenv';
import initDatabase from './core/db/db.js';
import createServer from './core/server/server.js';
import initBroker from './core/broker/broker.js';

const start = async () => {
  config();

  const database = initDatabase();
  const broker = initBroker();

  const server = await createServer(database, broker);
  await server.start();
};

start();
