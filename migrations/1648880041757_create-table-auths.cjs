/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('auths', {
    token: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('auths');
};
