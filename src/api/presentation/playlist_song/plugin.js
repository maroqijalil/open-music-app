import PlaylistSongService
  from '../../application/services/playlist_song/PlaylistSongService.js';
import PlaylistSongValidator
  from '../../application/services/playlist_song/PlaylistSongValidator.js';
import PlaylistSongRepository from
  '../../infrastructure/repositories/PlaylistSongRepository.js';
import routes from './routes.js';

const PLAYLIST_SONG_PLUGIN = {
  name: 'playlist_song',
  version: '1.0.0',
  register: async (server, {database}) => {
    const repository = new PlaylistSongRepository(database);
    const service = new PlaylistSongService(
        repository,
        new PlaylistSongValidator());

    server.route(routes(service));
  },
};

export default PLAYLIST_SONG_PLUGIN;
