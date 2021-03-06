/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint('playlists', 'fk_playlists.owner_users.id',
      'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');

  pgm.sql(`UPDATE playlists SET owner = NULL WHERE owner = 'old_playlists'`);

  pgm.sql(`DELETE FROM users WHERE id = 'old_playlists'`);
};
