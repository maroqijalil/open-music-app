import {nanoid} from 'nanoid';
import NotFoundError from '../../../core/exceptions/NotFoundError.js';
import ServerError from '../../../core/exceptions/ServerError.js';
import Song from '../../domain/models/Song.js';

class SongRepository {
  constructor(database) {
    this.database = database;
  }

  async store(song) {
    const {
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    } = song;

    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs ' +
            'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) ' +
            'RETURNING id',
      values: [
        id,
        title,
        year,
        performer,
        genre,
        duration,
        albumId,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this.database.query(query);

    if (!result.rows[0].id) {
      throw new ServerError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async get() {
    const result = await this.database.query('SELECT * FROM songs');
    return result.rows.map((song) => new Song(song).get());
  }

  async getById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map((song) => new Song(song).get())[0];
  }

  async getWhere(where) {
    let text = 'SELECT * FROM songs';
    const values = [];

    if (where.length > 0) {
      text += ' WHERE';

      let index = 1;
      where.forEach((opt) => {
        let key = opt[0];
        let placeholder = `$${index}`;
        const aggregate = opt[1];
        const value = opt[2];

        if (aggregate === 'LIKE') {
          key = `LOWER(${key})`;
          placeholder = `LOWER(${placeholder})`;
        }

        if (index > 1) {
          text += ` AND ${key} ${aggregate} ${placeholder}`;
        } else {
          text += ` ${key} ${aggregate} ${placeholder}`;
        }

        values.push(value);

        index += 1;
      });
    }

    const query = {text, values};

    const result = await this.database.query(query);

    return result.rows.map((song) => new Song(song).get());
  }

  async update(id, song) {
    const {
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    } = song;

    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE songs ' +
            'SET title = $1, ' +
              'year = $2, ' +
              'performer = $3, ' +
              'genre = $4, ' +
              'duration = $5, ' +
              'album_id = $6, ' +
              'updated_at = $7 ' +
            'WHERE id = $8 ' +
            'RETURNING id',
      values: [title, year, performer, genre, duration, albumId, updatedAt, id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  async delete(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
  }
}

export default SongRepository;
