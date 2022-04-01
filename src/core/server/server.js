import Hapi from '@hapi/hapi';
import ALBUM_PLUGIN from '../../api/presentation/album/plugin';

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

  await server.register([
    {
      plugin: ALBUM_PLUGIN,
      options: { database },
    },
  ]);

  return server;
};

export default createServer;
