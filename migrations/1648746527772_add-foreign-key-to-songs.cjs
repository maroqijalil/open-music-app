/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint('songs', 'fk_songs.album_id_albums.id',
      'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs.album_id_albums.id');

  pgm.sql(`UPDATE songs SET album_id = NULL WHERE album_id = 'old_songs'`);

  pgm.sql(`DELETE FROM albums WHERE id = 'old_songs'`);
};
