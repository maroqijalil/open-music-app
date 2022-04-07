import Response from '../../../../../core/utils/Response.js';

class ExportPlaylistHandler {
  constructor(repository, broker, validator) {
    this.repository = repository;
    this.broker = broker;
    this.validator = validator;

    this.store = this.store.bind(this);
  }

  async store(request, h) {
    this.validator.validate(request.payload);

    const {playlistId} = request.params;
    const {id: credentialId} = request.auth.credentials;

    await this.repository.verifyOwner(playlistId, credentialId);

    const message = {
      playlistId,
      targetEmail: request.payload.targetEmail,
    };

    await this.broker.send('export:playlists', JSON.stringify(message));

    return Response.create200Response({
      h,
      message: 'Permintaan Anda sedang kami proses',
      code: 201,
    });
  }
}

export default ExportPlaylistHandler;
