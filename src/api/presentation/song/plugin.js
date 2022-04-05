import SongHandler from '../../application/handlers/song/SongHandler.js';
import SongValidator from '../../application/handlers/song/SongValidator.js';
import SongRepository from
  '../../infrastructure/repositories/SongRepository.js';
import routes from './routes.js';

const SONG_PLUGIN = {
  name: 'song',
  version: '1.0.0',
  register: async (server, {database}) => {
    const repository = new SongRepository(database);
    const handler = new SongHandler(repository, new SongValidator());

    server.route(routes(handler));
  },
};

export default SONG_PLUGIN;
