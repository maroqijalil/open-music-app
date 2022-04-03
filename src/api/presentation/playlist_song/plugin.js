import PlaylistSongService
  from '../../application/services/playlist_song/PlaylistSongService.js';
import PlaylistSongValidator
  from '../../application/services/playlist_song/PlaylistSongValidator.js';
import PlaylistSongRepository from
  '../../infrastructure/repositories/PlaylistSongRepository.js';
import PlaylistRepository from
  '../../infrastructure/repositories/PlaylistRepository.js';
import routes from './routes.js';
import SongRepository
  from '../../infrastructure/repositories/SongRepository.js';

const PLAYLIST_SONG_PLUGIN = {
  name: 'playlist_song',
  version: '1.0.0',
  register: async (server, {database}) => {
    const playlistRepository = new PlaylistRepository(database);
    const playlistSongRepository = new PlaylistSongRepository(database);
    const songRepository = new SongRepository(database);

    const service = new PlaylistSongService({
      playlistRepository,
      playlistSongRepository,
      songRepository,
      validator: new PlaylistSongValidator(),
    });

    server.route(routes(service));
  },
};

export default PLAYLIST_SONG_PLUGIN;
