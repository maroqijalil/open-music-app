import {nanoid} from 'nanoid';
import AuthError from '../../../core/exceptions/AuthError.js';
import NotFoundError from '../../../core/exceptions/NotFoundError.js';
import ServerError from '../../../core/exceptions/ServerError.js';
import Playlist from '../../domain/models/Playlist.js';

class PlaylistRepository {
  constructor(database) {
    this.database = database;
  }

  async store(playlist) {
    const {name, owner} = playlist;

    const id = `playlist-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, owner, createdAt, updatedAt],
    };

    const result = await this.database.query(query);

    if (!result.rows[0].id) {
      throw new ServerError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getByOwner(owner) {
    const query = {
      text: 'SELECT playlists.*, users.username ' +
            'FROM playlists ' +
            'JOIN users ON users.id = playlists.owner ' +
            'WHERE owner = $1',
      values: [owner],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return result.rows.map((playlist) => new Playlist(playlist).get())[0];
  }

  async getById(id) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };

    return await this.database.query(query);
  }

  async verifyOwner(id, owner) {
    const result = await this.getById(id);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    if (result.rows[0].owner !== owner) {
      throw new AuthError('Anda tidak berhak mengakses resource ini');
    }
  }

  async delete(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
  }
}

export default PlaylistRepository;
