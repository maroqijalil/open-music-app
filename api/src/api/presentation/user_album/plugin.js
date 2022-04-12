import UserAlbumHandler
  from '../../application/handlers/user_album/UserAlbumHandler.js';
import AlbumRepository
  from '../../infrastructure/repositories/AlbumRepository.js';
import UserAlbumRepository
  from '../../infrastructure/repositories/UserAlbumRepository.js';
import routes from './routes.js';

const USER_ALBUM_PLUGIN = {
  name: 'user_album',
  version: '1.0.0',
  register: async (server, {database, cache}) => {
    const albumRepository = new AlbumRepository(database);
    const likeRepository = new UserAlbumRepository(database, cache);
    const handler =
      new UserAlbumHandler(albumRepository, likeRepository, cache);

    server.route(routes(handler));
  },
};

export default USER_ALBUM_PLUGIN;
