/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint('playlist_songs',
      'fk_playlist_songs.playlist_id_playlists.id',
      'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  pgm.addConstraint('playlist_songs',
      'fk_playlist_songs.song_id_songs.id',
      'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlist_songs',
      'fk_playlist_songs.playlist_id_playlists.id');

  pgm.sql(`UPDATE playlist_songs ` +
          `SET playlist_id = NULL WHERE playlist_id = 'old_playlist_songs'`);

  pgm.sql(`DELETE FROM playlists WHERE id = 'old_playlist_songs'`);

  pgm.dropConstraint('playlist_songs',
      'fk_playlist_songs.song_id_songs.id');

  pgm.sql(`UPDATE playlist_songs ` +
          `SET song_id = NULL WHERE song_id = 'old_playlist_songs'`);

  pgm.sql(`DELETE FROM songs WHERE id = 'old_playlist_songs'`);
};
