import Song from '../../domain/models/Song.js';

class PlaylistSongRepository {
  constructor(database) {
    this.database = database;
  }

  async getByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT songs.* ' +
            'FROM playlist_songs ' +
            'JOIN songs ON songs.id = playlist_songs.song_id ' +
            'WHERE playlist_id = $1',
      values: [playlistId],
    };

    const result = await this.database.query(query);

    return result.rows.map((song) => new Song(song).get());
  }
}

export default PlaylistSongRepository;
