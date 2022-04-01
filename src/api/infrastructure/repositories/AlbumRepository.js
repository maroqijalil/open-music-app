import { nanoid } from "nanoid";
import ClientError from "../../../core/exceptions/ClientError";
import ServerError from "../../../core/exceptions/ServerError";
import Album from "../../domain/models/Album";

class AlbumRepository {
  constructor(database) {
    this.database = database;
  }

  async store(album) {
    const { name, year } = album;

    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this.database.query(query);

    if (!result.rows[0].id) {
      throw new ServerError("Album gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getAll() {
    const result = await this.database.query('SELECT * FROM albums');
    return result.rows.map((album) => new Album(album).get());
  }

  async getById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new ClientError("Album tidak ditemukan");
    }

    return result.rows.map((album) => new Album(album).get())[0];
  }
}

export default AlbumRepository;
