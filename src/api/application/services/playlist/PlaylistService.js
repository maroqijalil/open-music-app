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
  }

  async get(request, h) {
    const {id: credentialId} = request.auth.credentials;

    const playlists = await this.repository.getByOwner(credentialId);

    return Response.create200Response({
      h,
      data: {
        playlists,
      },
    });
  }

  async delete(request, h) {
    const {id} = request.params;
    const {id: credentialId} = request.auth.credentials;

    await this.repository.verifyOwner(id, credentialId);
    await this.repository.delete(id);

    return Response.create200Response({
      h,
      message: 'Playlist berhasil dihapus',
    });
  }
}

export default PlaylistService;
