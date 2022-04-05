import Response from '../../../../core/utils/Response.js';

class PlaylistSongService {
  constructor({
    playlistRepository,
    playlistSongRepository,
    songRepository,
    validator,
  }) {
    this.playlistRepository = playlistRepository;
    this.playlistSongRepository = playlistSongRepository;
    this.songRepository = songRepository;
    this.validator = validator;

    this.verifyOwner = this.verifyOwner.bind(this);
    this.store = this.store.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
  }

  async verifyOwner(request) {
    const {id: playlistId} = request.params;
    const {id: credentialId} = request.auth.credentials;

    await this.playlistRepository.verifyOwner(playlistId, credentialId);
  }

  async store(request, h) {
    this.validator.validate(request.payload);

    await this.verifyOwner(request);

    const {id: playlistId} = request.params;
    const {songId} = request.payload;

    await this.songRepository.getById(songId);
    await this.playlistSongRepository.store({
      songId,
      playlistId,
    });

    return Response.create200Response({
      h,
      message: 'Lagu berhasil ditambahkan pada playlist',
      code: 201,
    });
  }

  async get(request, h) {
    await this.verifyOwner(request);

    const {id: playlistId} = request.params;

    const playlist = await this.playlistRepository.getById(playlistId);
    const songs = await this.playlistSongRepository.getByPlaylistId(
        playlistId);

    return Response.create200Response({
      h,
      data: {
        playlist: {
          ...playlist,
          songs: songs.map((song) => ({
            id: song.id,
            title: song.title,
            performer: song.performer,
          })),
        },
      },
    });
  }

  async delete(request, h) {
    this.validator.validate(request.payload);

    await this.verifyOwner(request);

    const {id: playlistId} = request.params;

    await this.playlistSongRepository.delete({
      ...request.payload,
      playlistId,
    });

    return Response.create200Response({
      h,
      message: 'PlaylistSong berhasil dihapus',
    });
  }
}

export default PlaylistSongService;
