import PlaylistSongHandler
  from '../../application/handlers/playlist_song/PlaylistSongHandler.js';
import PlaylistSongValidator
  from '../../application/handlers/playlist_song/PlaylistSongValidator.js';
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

    const handler = new PlaylistSongHandler({
      playlistRepository,
      playlistSongRepository,
      songRepository,
      validator: new PlaylistSongValidator(),
    });

    server.route(routes(handler));
  },
};

export default PLAYLIST_SONG_PLUGIN;
