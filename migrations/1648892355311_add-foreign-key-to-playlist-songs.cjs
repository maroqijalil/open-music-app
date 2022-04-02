/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`INSERT INTO playlists(id, name, owner, created_at, updated_at) ` +
          `VALUES ('old_playlist_songs', 'old_playlist_songs', ` +
            `'old playlist_songs', 'old playlist_songs' ` +
            `'old playlist_songs')`);

  pgm.sql(`UPDATE playlist_songs ` +
          `SET playlist_id = 'old_playlist_songs' WHERE playlist_id = NULL`);

  pgm.addConstraint('playlist_songs',
      'fk_playlist_songs.playlist_id_playlists.id',
      'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  pgm.sql(`INSERT INTO songs(id, title, year, performer, genre, duration, ` +
            `album_id, created_at, updated_at) ` +
          `VALUES ('old_playlist_songs', 'old_playlist_songs', ` +
            `'old playlist_songs', 'old playlist_songs' ` +
            `'old playlist_songs', 'old playlist_songs' ` +
            `'old playlist_songs', 'old playlist_songs' ` +
            `'old playlist_songs')`);

  pgm.sql(`UPDATE playlist_songs ` +
          `SET song_id = 'old_playlist_songs' WHERE song_id = NULL`);

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
