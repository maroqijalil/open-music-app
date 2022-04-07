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
  register: async (server, {database, broker}) => {
    const repository = new ExportPlaylistRepository(database);
    const service = new EmailBroker(broker);
    const handler = new ExportPlaylistHandler(
        repository, service, new ExportPlaylistValidator());

    server.route(routes(handler));
  },
};

export default EXPORT_PLAYLIST_PLUGIN;
