/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint('user_album_likes',
      'fk_user_album_likes.user_id_users.id',
      'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');

  pgm.addConstraint('user_album_likes',
      'fk_user_album_likes.album_id_albums.id',
      'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('user_album_likes',
      'fk_user_album_likes.user_id_users.id');

  pgm.sql(`UPDATE user_album_likes ` +
          `SET user_id = NULL WHERE user_id = 'old_user_album_likes'`);

  pgm.sql(`DELETE FROM users WHERE id = 'old_user_album_likes'`);

  pgm.dropConstraint('user_album_likes',
      'fk_user_album_likes.album_id_albums.id');

  pgm.sql(`UPDATE user_album_likes ` +
          `SET album_id = NULL WHERE album_id = 'old_user_album_likes'`);

  pgm.sql(`DELETE FROM albums WHERE id = 'old_user_album_likes'`);
};
