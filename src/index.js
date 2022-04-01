import { config } from "dotenv";
import initDatabase from "./core/db/db";
import createServer from "./core/server/server";

const start = async () => {
  config();

  const database = initDatabase();

  const server = await createServer(database);
  await server.start();
};

start();
