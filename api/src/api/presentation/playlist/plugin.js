import PlaylistHandler
  from '../../application/handlers/playlist/PlaylistHandler.js';
import PlaylistValidator
  from '../../application/handlers/playlist/PlaylistValidator.js';
import PlaylistRepository from
  '../../infrastructure/repositories/PlaylistRepository.js';
import routes from './routes.js';

const PLAYLIST_PLUGIN = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, {database}) => {
    const repository = new PlaylistRepository(database);
    const handler = new PlaylistHandler(repository, new PlaylistValidator());

    server.route(routes(handler));
  },
};

export default PLAYLIST_PLUGIN;
