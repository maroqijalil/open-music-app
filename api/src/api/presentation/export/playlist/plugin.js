import ExportPlaylistHandler
  from '../../../application/handlers/export/playlist/ExportPlaylistHandler.js';
import ExportPlaylistValidator from
  '../../../application/handlers/export/playlist/ExportPlaylistValidator.js';
import ExportPlaylistRepository
  from '../../../infrastructure/repositories/ExportPlaylistRepository.js';
import routes from './routes.js';
import EmailBroker from '../../../infrastructure/brokers/EmailBroker.js';

const EXPORT_PLAYLIST_PLUGIN = {
  name: 'export/playlist',
  version: '1.0.0',
  register: async (server, {database}) => {
    const repository = new ExportPlaylistRepository(database);
    const broker = new EmailBroker();
    const handler = new ExportPlaylistHandler(
        repository, broker, new ExportPlaylistValidator());

    server.route(routes(handler));
  },
};

export default EXPORT_PLAYLIST_PLUGIN;
