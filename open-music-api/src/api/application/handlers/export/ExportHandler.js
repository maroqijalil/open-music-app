import Response from '../../../../core/utils/Response.js';

class ExportHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.store = this.store.bind(this);
  }

  async store(request, h) {
    this.validator.validate(request.payload);

    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail,
    };

    await this.service.send('export:notes', JSON.stringify(message));

    return Response.create200Response({
      h,
      message: 'Permintaan Anda sedang kami proses',
      code: 201,
    });
  }
}

export default ExportHandler;
