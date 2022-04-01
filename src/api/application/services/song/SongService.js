import Response from "../../../../core/utils/response.js";

class SongService {
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
    try {
      this.validator.validate(request.payload);

      const songId = await this.repository.store(request.payload);

      return Response.create200Response({
        h,
        data: {
          songId,
        },
        code: 201,
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async get(request, h) {
    try {
      const { title, performer } = request.query;

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
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async getById(request, h) {
    try {
      const { id } = request.params;

      const song = await this.repository.getById(id);

      return Response.create200Response({
        h,
        data: {
          song,
        },
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async update(request, h) {
    try {
      this.validator.validate(request.payload);

      const { id } = request.params;

      await this.repository.update(id, request.payload);

      return Response.create200Response({
        h,
        message: "Lagu berhasil diperbarui",
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async delete(request, h) {
    try {
      const { id } = request.params;

      await this.repository.delete(id);

      return Response.create200Response({
        h,
        message: "Lagu berhasil dihapus",
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }
}

export default SongService;
