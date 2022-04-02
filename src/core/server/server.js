import Hapi from '@hapi/hapi';
import ALBUM_PLUGIN from '../../api/presentation/album/plugin.js';
import SONG_PLUGIN from '../../api/presentation/song/plugin.js';
import Jwt from '@hapi/jwt';

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
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('open_music_api_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: ALBUM_PLUGIN,
      options: {database},
    },
    {
      plugin: SONG_PLUGIN,
      options: {database},
    },
  ]);

  return server;
};

export default createServer;
