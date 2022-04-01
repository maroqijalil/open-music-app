import AlbumService from "../../application/services/album/AlbumService";
import AlbumValidator from "../../application/services/album/AlbumValidator";
import AlbumRepository from "../../infrastructure/repositories/AlbumRepository";
import ALBUM_ROUTES from "./routes";

const ALBUM_PLUGIN = {
  name: 'album',
  version: '1.0.0',
  register: async (server, { database }) => {
    const repository = new AlbumRepository(database);
    const service = new AlbumService(repository, new AlbumValidator());

    server.route(ALBUM_ROUTES(service));
  },
};

export default ALBUM_PLUGIN;
