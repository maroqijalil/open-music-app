import routes from './routes.js';

const UPLOAD_IMG_PLUGIN = {
  name: 'upload/img',
  version: '1.0.0',
  register: async (server, {publicPath}) => {
    server.route(routes(publicPath));
  },
};

export default UPLOAD_IMG_PLUGIN;
