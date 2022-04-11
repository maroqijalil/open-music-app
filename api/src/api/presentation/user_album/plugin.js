import UserAlbumHandler
  from '../../application/handlers/user_album/UserAlbumHandler.js';
import UserAlbumRepository
  from '../../infrastructure/repositories/UserAlbumRepository.js';
import routes from './routes.js';

const USER_ALBUM_PLUGIN = {
  name: 'user_album',
  version: '1.0.0',
  register: async (server, {database}) => {
    const repository = new UserAlbumRepository(database);
    const handler = new UserAlbumHandler(repository);

    server.route(routes(handler));
  },
};

export default USER_ALBUM_PLUGIN;
