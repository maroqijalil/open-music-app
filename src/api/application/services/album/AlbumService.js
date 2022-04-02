import Response from '../../../../core/utils/response.js';

class AlbumService {
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
    try {
      this.validator.validate(request.payload);

      const albumId = await this.albumRepository.store(request.payload);

      return Response.create200Response({
        h,
        data: {
          albumId,
        },
        code: 201,
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async getById(request, h) {
    try {
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
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async update(request, h) {
    try {
      this.validator.validate(request.payload);

      const {id} = request.params;

      await this.albumRepository.update(id, request.payload);

      return Response.create200Response({
        h,
        message: 'Album berhasil diperbarui',
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async delete(request, h) {
    try {
      const {id} = request.params;

      await this.albumRepository.delete(id);

      return Response.create200Response({
        h,
        message: 'Album berhasil dihapus',
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }
}

export default AlbumService;
