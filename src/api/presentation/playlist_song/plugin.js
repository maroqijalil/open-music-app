import PlaylistService
  from '../../application/services/playlist/PlaylistService.js';
import PlaylistValidator
  from '../../application/services/playlist/PlaylistValidator.js';
import PlaylistRepository from
  '../../infrastructure/repositories/PlaylistRepository.js';
import routes from './routes.js';

const PLAYLIST_PLUGIN = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, {database}) => {
    const repository = new PlaylistRepository(database);
    const service = new PlaylistService(repository, new PlaylistValidator());

    server.route(routes(service));
  },
};

export default PLAYLIST_PLUGIN;
