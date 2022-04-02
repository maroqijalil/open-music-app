import AlbumService from '../../application/services/album/AlbumService.js';
import AlbumValidator from '../../application/services/album/AlbumValidator.js';
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
    const service = new AlbumService(
        albumRepository,
        songRepository,
        new AlbumValidator(),
    );

    server.route(routes(service));
  },
};

export default ALBUM_PLUGIN;
