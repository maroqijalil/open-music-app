import Hapi from '@hapi/hapi';

const createServer = async (database) => {
  const server = Hapi.server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  return server;
};

export default createServer;
