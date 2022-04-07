import Response from '../../../../core/utils/Response.js';

class AlbumHandler {
  constructor(albumRepository, songRepository, validator) {
    this.albumRepository = albumRepository;
    this.songRepository = songRepository;
    this.validator = validator;

    this.store = this.store.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async store(request, h) {
    this.validator.validate(request.payload);

    const albumId = await this.albumRepository.store(request.payload);

    return Response.create200Response({
      h,
      data: {
        albumId,
      },
      code: 201,
    });
  }

  async getById(request, h) {
    const {id} = request.params;

    const album = await this.albumRepository.getById(id);
    const songs = await this.songRepository.getWhere([
      ['album_id', '=', id],
    ]);

    return Response.create200Response({
      h,
      data: {
        album: {
          ...album,
          songs,
        },
      },
    });
  }

  async update(request, h) {
    this.validator.validate(request.payload);

    const {id} = request.params;

    await this.albumRepository.update(id, request.payload);

    return Response.create200Response({
      h,
      message: 'Album berhasil diperbarui',
    });
  }

  async delete(request, h) {
    const {id} = request.params;

    await this.albumRepository.delete(id);

    return Response.create200Response({
      h,
      message: 'Album berhasil dihapus',
    });
  }
}

export default AlbumHandler;
