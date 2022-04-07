import UserHandler from '../../application/handlers/user/UserHandler.js';
import UserValidator from '../../application/handlers/user/UserValidator.js';
import UserRepository from
  '../../infrastructure/repositories/UserRepository.js';
import routes from './routes.js';

const USER_PLUGIN = {
  name: 'user',
  version: '1.0.0',
  register: async (server, {database}) => {
    const repository = new UserRepository(database);
    const handler = new UserHandler(repository, new UserValidator());

    server.route(routes(handler));
  },
};

export default USER_PLUGIN;
