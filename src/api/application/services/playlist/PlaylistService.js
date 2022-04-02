import Response from '../../../../core/utils/Response.js';

class PlaylistService {
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;

    this.store = this.store.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
  }

  async store(request, h) {
    try {
      this.validator.validate(request.payload);

      const {id: credentialId} = request.auth.credentials;

      const playlistId = await this.repository.store({
        ...request.payload,
        owner: credentialId,
      });

      return Response.create200Response({
        h,
        data: {
          playlistId,
        },
        code: 201,
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async get(request, h) {
    try {
      const {id: credentialId} = request.auth.credentials;

      const playlists = await this.repository.getByOwner(credentialId);

      return Response.create200Response({
        h,
        data: {
          playlists,
        },
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async delete(request, h) {
    try {
      const {id} = request.params;
      const {id: credentialId} = request.auth.credentials;

      await this.repository.verifyOwner(id, credentialId);
      await this.repository.delete(id);

      return Response.create200Response({
        h,
        message: 'Playlist berhasil dihapus',
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }
}

export default PlaylistService;
