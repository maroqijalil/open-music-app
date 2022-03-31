import ALBUM_ROUTES from "./routes";

const ALBUM_PLUGIN = {
  name: 'album',
  version: '1.0.0',
  register: async (server, { db }) => {
    server.route(ALBUM_ROUTES);
  },
};

export default ALBUM_PLUGIN;
