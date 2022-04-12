import PlaylistRepository from
  '../../../infrastructure/repositories/PlaylistRepository.js';
import PlaylistSongRepository from
  '../../../infrastructure/repositories/PlaylistSongRepository.js';
import ExportPlaylistMailer from
  '../../../infrastructure/mailers/ExportPlaylistMailer.js';
import ExportPlaylistListener from
  '../../../application/listeners/export/playlist/ExportPlaylistListener.js';

const EXPORT_PLAYLIST_QUEUE = {
  name: 'export:playlists',
  register: (channel, {database, mailer}) => {
    const playlistRepository = new PlaylistRepository(database);
    const playlistSongRepository = new PlaylistSongRepository(database);
    const service = new ExportPlaylistMailer(mailer);

    const listener = new ExportPlaylistListener(
        playlistRepository, playlistSongRepository, service);

    channel.setListener(listener.listen);
  },
};

export default EXPORT_PLAYLIST_QUEUE;
