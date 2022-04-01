import Response from "../../../../core/utils/response";

class AlbumService {
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;

    this.handleError = this.handleError.bind(this);
    this.store = this.store.bind(this);
  }

  async store(request, h) {
    try {
      this.validator.validate(request.payload);

      const albumId = await this.repository.store(request.payload);

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
      const { id } = request.params;

      const album = await this.repository.getById(id);

      return Response.create200Response({
        h,
        data: {
          album,
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
        message: "Album berhasil diperbarui",
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
        message: "Album berhasil dihapus",
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }
}

export default AlbumService;
