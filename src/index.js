import { config } from "dotenv";
import database from "./core/db/db";
import createServer from "./core/server/server";

const start = async () => {
  config();

  const server = await createServer(database);
  await server.start();
};

start();
