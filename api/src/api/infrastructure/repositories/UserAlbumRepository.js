import {nanoid} from 'nanoid';
import NotFoundError from '../../../core/exceptions/NotFoundError.js';
import ServerError from '../../../core/exceptions/ServerError.js';

class UserAlbumRepository {
  constructor(database) {
    this.database = database;
  }

  async store(userAlbum) {
    const {userId, albumId} = userAlbum;

    const id = `user-album-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO user_album_likes ' +
            'VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this.database.query(query);

    if (!result.rows[0].id) {
      throw new ServerError('Album tidak berhasil disukai');
    }
  }

  async isExist(userAlbum) {
    const {userId, albumId} = userAlbum;

    const query = {
      text: 'SELECT id FROM user_album_likes ' +
            'WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this.database.query(query);

    return result.rows.length !== 0;
  }

  async countByAlbumId(id) {
    const query = {
      text: 'SELECT COUNT(*) FROM user_album_likes ' +
            'WHERE album_id = $1',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return result.rows[0].count;
  }

  async delete(userAlbum) {
    const {userId, albumId} = userAlbum;

    const query = {
      text: 'DELETE FROM user_album_likes ' +
            'WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(
          'Album gagal tidak disukai. Id tidak ditemukan');
    }
  }
}

export default UserAlbumRepository;
