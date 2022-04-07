import bcrypt from 'bcrypt';
import {nanoid} from 'nanoid';
import ClientError from '../../../core/exceptions/ClientError.js';
import AuthError from '../../../core/exceptions/AuthError.js';
import ServerError from '../../../core/exceptions/ServerError.js';

class UserRepository {
  constructor(database) {
    this.database = database;
  }

  async store(user) {
    const {username, password, fullname} = user;

    await this.verifyUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this.database.query(query);

    if (!result.rows[0].id) {
      throw new ServerError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getByUsername(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    return await this.database.query(query);
  }

  async verifyUsername(username) {
    const result = await this.getByUsername(username);

    if (result.rows.length > 0) {
      throw new ClientError(
          'Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async verifyCredential(username, password) {
    const result = await this.getByUsername(username);

    if (!result.rows.length) {
      throw new AuthError('Kredensial yang Anda berikan salah');
    }

    const {id, password: hashedPassword} = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthError('Kredensial yang Anda berikan salah');
    }

    return id;
  }
}

export default UserRepository;
