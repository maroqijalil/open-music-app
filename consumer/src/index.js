import {config} from 'dotenv';
import initDatabase from './core/db/db.js';
import initMailer from './core/mailer/mailer';
import createBroker from './core/broker/broker.js';

const start = async () => {
  config();

  const database = initDatabase();
  const mailer = initMailer();

  const broker = await createBroker(database, mailer);
  broker.start();
};

start();
