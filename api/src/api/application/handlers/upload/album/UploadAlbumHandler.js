import Response from '../../../../../core/utils/Response.js';

class UploadAlbumHandler {
  constructor(repository, storage, validator) {
    this.repository = repository;
    this.storage = storage;
    this.validator = validator;

    this.store = this.store.bind(this);
  }

  async store(request, h) {
    const {cover} = request.payload;

    this.validator.validate(cover.hapi.headers);

    const {id} = request.params;

    await this.repository.getById(id);

    const filename = await this.storage.write(cover, cover.hapi);

    await this.repository.updateCover(id, filename);

    return Response.create200Response({
      h,
      message: 'Sampul berhasil diunggah',
      code: 201,
    });
  }
}

export default UploadAlbumHandler;
