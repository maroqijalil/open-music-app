import Hapi from '@hapi/hapi';
import ALBUM_PLUGIN from '../../api/presentation/album/plugin.js';
import SONG_PLUGIN from '../../api/presentation/song/plugin.js';

const createServer = async (database) => {
  const server = Hapi.server({
    host: process.env.SERVER_HOST ?? 'localhost',
    port: process.env.SERVER_PORT ?? 5000,
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
    {
      plugin: SONG_PLUGIN,
      options: { database },
    },
  ]);

  return server;
};

export default createServer;
