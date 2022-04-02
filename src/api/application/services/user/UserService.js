import Response from '../../../../core/utils/Response.js';

class UserService {
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;

    this.store = this.store.bind(this);
  }

  async store(request, h) {
    try {
      this.validator.validate(request.payload);

      const userId = await this.repository.store(request.payload);

      return Response.create200Response({
        h,
        data: {
          userId,
        },
        code: 201,
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }
}

export default UserService;