/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlists_songs', {
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"playlists"',
      onDelete: 'cascade',
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"songs"',
      onDelete: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('playlists_songs');
};
