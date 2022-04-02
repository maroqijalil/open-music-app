import AuthService from '../../application/services/auth/AuthService.js';
import AuthValidator from '../../application/services/auth/AuthValidator.js';
import TokenValidator from '../../application/services/auth/TokenValidator.js';
import AuthRepository from
  '../../infrastructure/repositories/AuthRepository.js';
import UserRepository
  from '../../infrastructure/repositories/UserRepository.js';
import routes from './routes.js';

const AUTH_PLUGIN = {
  name: 'auth',
  version: '1.0.0',
  register: async (server, {database}) => {
    const authRepository = new AuthRepository(database);
    const userRepository = new UserRepository(database);
    const authValidator = new AuthValidator();
    const tokenValidator = new TokenValidator();

    const service = new AuthService({
      authRepository,
      userRepository,
      authValidator,
      tokenValidator,
    });

    server.route(routes(service));
  },
};

export default AUTH_PLUGIN;
