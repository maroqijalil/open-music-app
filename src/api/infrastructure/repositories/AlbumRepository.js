import {nanoid} from 'nanoid';
import NotFoundError from '../../../core/exceptions/NotFoundError.js';
import ServerError from '../../../core/exceptions/ServerError.js';
import Album from '../../domain/models/Album.js';

class AlbumRepository {
  constructor(database) {
    this.database = database;
  }

  async store(album) {
    const {name, year} = album;

    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this.database.query(query);

    if (!result.rows[0].id) {
      throw new ServerError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return result.rows.map((album) => new Album(album).get())[0];
  }

  async update(id, album) {
    const {name, year} = album;

    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE albums ' +
            'SET name = $1, year = $2, updated_at = $3 WHERE id = $4 ' +
            'RETURNING id',
      values: [name, year, updatedAt, id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async delete(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
  }
}

export default AlbumRepository;
