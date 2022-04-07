import Playlist from '../../domain/models/Playlist.js';

class PlaylistRepository {
  constructor(database) {
    this.database = database;
  }

  async getById(id) {
    const query = {
      text: 'SELECT * FROM playlists WHERE playlists.id = $1',
      values: [id],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new Error('Playlist tidak ditemukan');
    }

    return result.rows.map((playlist) => new Playlist(playlist).get())[0];
  }
}

export default PlaylistRepository;
