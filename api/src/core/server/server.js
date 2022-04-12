import Hapi from '@hapi/hapi';
import ALBUM_PLUGIN from '../../api/presentation/album/plugin.js';
import SONG_PLUGIN from '../../api/presentation/song/plugin.js';
import Jwt from '@hapi/jwt';
import AUTH_PLUGIN from '../../api/presentation/auth/plugin.js';
import USER_PLUGIN from '../../api/presentation/user/plugin.js';
import PLAYLIST_PLUGIN from '../../api/presentation/playlist/plugin.js';
import PLAYLIST_SONG_PLUGIN
  from '../../api/presentation/playlist_song/plugin.js';
import Response from '../utils/Response.js';
import ClientError from '../exceptions/ClientError.js';
import ServerError from '../exceptions/ServerError.js';
import EXPORT_PLAYLIST_PLUGIN
  from '../../api/presentation/export/playlist/plugin.js';
import Inert from '@hapi/inert';
import UPLOAD_IMG_PLUGIN from '../../api/presentation/upload/img/plugin.js';
import USER_ALBUM_PLUGIN from '../../api/presentation/user_album/plugin.js';
import UPLOAD_ALBUM_PLUGIN from '../../api/presentation/upload/album/plugin.js';

const createServer = async (database, broker, publicPath, cache) => {
  const server = Hapi.server({
    host: process.env.HOST ?? 'localhost',
    port: process.env.PORT ?? 5000,
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
    {
      plugin: Inert,
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
    {
      plugin: AUTH_PLUGIN,
      options: {database},
    },
    {
      plugin: USER_PLUGIN,
      options: {database},
    },
    {
      plugin: PLAYLIST_PLUGIN,
      options: {database},
    },
    {
      plugin: PLAYLIST_SONG_PLUGIN,
      options: {database},
    },
    {
      plugin: EXPORT_PLAYLIST_PLUGIN,
      options: {database, broker},
    },
    {
      plugin: UPLOAD_IMG_PLUGIN,
      options: {publicPath},
    },
    {
      plugin: UPLOAD_ALBUM_PLUGIN,
      options: {database, publicPath},
    },
    {
      plugin: USER_ALBUM_PLUGIN,
      options: {database, cache},
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const {response} = request;

    if (response instanceof Error) {
      // console.log(response);
    }

    if (response instanceof ClientError) {
      return Response.create400Response({
        h,
        message: response.message,
        code: response.statusCode,
      });
    }

    if (response instanceof ServerError) {
      return Response.create500Response({
        h,
        message: response.message,
        code: response.statusCode,
      });
    }

    return response.continue || response;
  });

  return server;
};

export default createServer;
