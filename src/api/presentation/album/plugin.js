import AlbumHandler from '../../application/handlers/album/AlbumHandler.js';
import AlbumValidator from '../../application/handlers/album/AlbumValidator.js';
import AlbumRepository
  from '../../infrastructure/repositories/AlbumRepository.js';
import SongRepository
  from '../../infrastructure/repositories/SongRepository.js';
import routes from './routes.js';

const ALBUM_PLUGIN = {
  name: 'album',
  version: '1.0.0',
  register: async (server, {database}) => {
    const albumRepository = new AlbumRepository(database);
    const songRepository = new SongRepository(database);
    const handler = new AlbumHandler(
        albumRepository,
        songRepository,
        new AlbumValidator(),
    );

    server.route(routes(handler));
  },
};

export default ALBUM_PLUGIN;
