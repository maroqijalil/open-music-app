import * as path from 'path';

const routes = (publicPath) => [
  {
    method: 'GET',
    path: '/img/{param*}',
    handler: {
      directory: {
        path: path.resolve(publicPath, 'img'),
      },
    },
  },
];

export default routes;
