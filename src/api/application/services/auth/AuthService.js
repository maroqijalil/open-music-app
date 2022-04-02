import Response from '../../../../core/utils/Response.js';
import Token from '../../../../core/utils/Token.js';

class AuthService {
  constructor({
    authRepository,
    userRepository,
    authValidator,
    tokenValidator,
  }) {
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.authValidator = authValidator;
    this.tokenValidator = tokenValidator;

    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  async store(request, h) {
    try {
      this.authValidator.validate(request.payload);

      const id = await this.userRepository.verifyCredential(request.payload);

      const accessToken = Token.generateAccessToken({id});
      const refreshToken = Token.generateRefreshToken({id});

      await this.authRepository.store(refreshToken);

      return Response.create200Response({
        h,
        data: {
          accessToken,
          refreshToken,
        },
        code: 201,
      });
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async update(request, h) {
    try {
      const {refreshToken} = request.payload;

      this.tokenValidator.validate(refreshToken);

      await this.authRepository.verifyRefreshToken(refreshToken);
      const id = Token.verifyRefreshToken(refreshToken);

      const accessToken = Token.generateAccessToken(id);
      return {
        status: 'success',
        message: 'Access Token berhasil diperbarui',
        data: {
          accessToken,
        },
      };
    } catch (error) {
      return Response.handleError(h, error);
    }
  }

  async delete(request, h) {
    try {
      const {refreshToken} = request.payload;

      this.tokenValidator.validate(refreshToken);

      await this.authRepository.verifyRefreshToken(refreshToken);
      await this.authRepository.delete(refreshToken);

      return {
        status: 'success',
        message: 'Refresh token berhasil dihapus',
      };
    } catch (error) {
      return Response.handleError(h, error);
    }
  }
}

export default AuthService;
