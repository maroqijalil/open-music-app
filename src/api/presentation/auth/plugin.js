import AuthHandler from '../../application/handlers/auth/AuthHandler.js';
import AuthValidator from '../../application/handlers/auth/AuthValidator.js';
import TokenValidator from '../../application/handlers/auth/TokenValidator.js';
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

    const handler = new AuthHandler({
      authRepository,
      userRepository,
      authValidator,
      tokenValidator,
    });

    server.route(routes(handler));
  },
};

export default AUTH_PLUGIN;
