import NotFoundError from '../../../core/exceptions/NotFoundError.js';
import ServerError from '../../../core/exceptions/ServerError.js';
import Song from '../../domain/models/Song.js';

class PlaylistSongRepository {
  constructor(database) {
    this.database = database;
  }

  async store(playlistSong) {
    const {playlistId, songId} = playlistSong;

    const query = {
      text: 'INSERT INTO playlists_songs VALUES($1, $2) RETURNING playlist_id',
      values: [playlistId, songId],
    };

    const result = await this.database.query(query);

    if (!result.rows[0].playlist_id) {
      throw new ServerError('Lagu gagal ditambahkan pada playlist');
    }
  }

  async getByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT songs.* ' +
            'FROM playlists_songs ' +
            'JOIN songs ON songs.song_id = playlists_songs.song_id ' +
            'WHERE playlist_id = $1',
      values: [playlistId],
    };

    const result = await this.database.query(query);

    return result.rows.map((playlistSong) => new Song(playlistSong).get());
  }

  async deleteBySongId(playlistSong) {
    const {playlistId, songId} = playlistSong;

    const query = {
      text: 'DELETE FROM playlists_songs ' +
            'WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this.database.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(
          'Lagu pada plyalist gagal dihapus. Id tidak ditemukan');
    }
  }
}

export default PlaylistSongRepository;
