import SongService from "../../application/services/song/SongService.js";
import SongValidator from "../../application/services/song/SongValidator.js";
import SongRepository from "../../infrastructure/repositories/SongRepository.js";
import SONG_ROUTES from "./routes.js";

const SONG_PLUGIN = {
  name: 'song',
  version: '1.0.0',
  register: async (server, { database }) => {
    const repository = new SongRepository(database);
    const service = new SongService(repository, new SongValidator());

    server.route(SONG_ROUTES(service));
  },
};

export default SONG_PLUGIN;
