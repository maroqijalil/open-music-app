import ClientError from '../../../core/exceptions/ClientError.js';

class AuthRepository {
  constructor(database) {
    this.database = database;
  }

  async store(token) {
    const query = {
      text: 'INSERT INTO auths VALUES($1)',
      values: [token],
    };

    await this.database.query(query);
  }

  async getByToken(token) {
    const query = {
      text: 'SELECT * FROM auths WHERE token = $1',
      values: [token],
    };

    return await this.database.query(query);
  }

  async verifyRefreshToken(token) {
    const result = this.getByToken(token);

    if (!result.rows.length) {
      throw new ClientError('Refresh token tidak valid');
    }
  }

  async delete(token) {
    await this.verifyRefreshToken(token);

    const query = {
      text: 'DELETE FROM auths WHERE token = $1',
      values: [token],
    };

    await this.database.query(query);
  }
}

export default AuthRepository;
