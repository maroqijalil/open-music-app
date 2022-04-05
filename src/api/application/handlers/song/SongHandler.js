import Response from '../../../../core/utils/Response.js';

class SongHandler {
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;

    this.store = this.store.bind(this);
    this.get = this.get.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async store(request, h) {
    this.validator.validate(request.payload);

    const songId = await this.repository.store(request.payload);

    return Response.create200Response({
      h,
      data: {
        songId,
      },
      code: 201,
    });
  }

  async get(request, h) {
    const {title, performer} = request.query;

    const where = [];

    if (title) {
      where.push(['title', 'LIKE', `%${title}%`]);
    }

    if (performer) {
      where.push(['performer', 'LIKE', `%${performer}%`]);
    }

    const songs = await this.repository.getWhere(where);

    return Response.create200Response({
      h,
      data: {
        songs: songs.map((song) => ({
          id: song.id,
          title: song.title,
          performer: song.performer,
        })),
      },
    });
  }

  async getById(request, h) {
    const {id} = request.params;

    const song = await this.repository.getById(id);

    return Response.create200Response({
      h,
      data: {
        song,
      },
    });
  }

  async update(request, h) {
    this.validator.validate(request.payload);

    const {id} = request.params;

    await this.repository.update(id, request.payload);

    return Response.create200Response({
      h,
      message: 'Lagu berhasil diperbarui',
    });
  }

  async delete(request, h) {
    const {id} = request.params;

    await this.repository.delete(id);

    return Response.create200Response({
      h,
      message: 'Lagu berhasil dihapus',
    });
  }
}

export default SongHandler;
