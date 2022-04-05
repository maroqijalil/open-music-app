import Response from '../../../../core/utils/Response.js';

class UserService {
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;

    this.store = this.store.bind(this);
  }

  async store(request, h) {
    this.validator.validate(request.payload);

    const {username} = request.payload;
    await this.repository.verifyUsername(username);

    const userId = await this.repository.store(request.payload);

    return Response.create200Response({
      h,
      data: {
        userId,
      },
      code: 201,
    });
  }
}

export default UserService;
