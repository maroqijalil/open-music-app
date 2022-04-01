import { nanoid } from "nanoid";
import ClientError from "../../../core/exceptions/ClientError.js";
import ServerError from "../../../core/exceptions/ServerError.js";
import Song from "../../domain/models/Song.js";

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
      album_id,
    } = song;

    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, performer, genre, duration, album_id, createdAt, updatedAt],
    };

    const result = await this.database.query(query);

    if (!result.rows[0].id) {
      throw new ServerError("Lagu gagal ditambahkan");
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
      throw new ClientError("Lagu tidak ditemukan", 404);
    }

    return result.rows.map((song) => new Song(song).get())[0];
  }

  async update(id, song) {
    const {
      title,
      year,
      performer,
      genre,
      duration,
      album_id,
    } = song;

    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, performer, genre, duration, album_id, updatedAt, id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new ClientError("Gagal memperbarui lagu. Id tidak ditemukan", 404);
    }
  }

  async delete(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new ClientError("Catatan gagal dihapus. Id tidak ditemukan", 404);
    }
  }
}

export default SongRepository;
