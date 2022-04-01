import { config } from "dotenv";
import initDatabase from "./core/db/db.js";
import createServer from "./core/server/server.js";

const start = async () => {
  config();

  const database = initDatabase();

  const server = await createServer(database);
  await server.start();
};

start();
