import UserService from '../../application/services/user/UserService.js';
import UserValidator from '../../application/services/user/UserValidator.js';
import UserRepository from
  '../../infrastructure/repositories/UserRepository.js';
import routes from './routes.js';

const USER_PLUGIN = {
  name: 'user',
  version: '1.0.0',
  register: async (server, {database}) => {
    const repository = new UserRepository(database);
    const service = new UserService(repository, new UserValidator());

    server.route(routes(service));
  },
};

export default USER_PLUGIN;
