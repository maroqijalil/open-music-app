import UploadAlbumHandler
  from '../../../application/handlers/upload/album/UploadAlbumHandler.js';
import UploadAlbumValidator
  from '../../../application/handlers/upload/album/UploadAlbumValidator.js';
import AlbumRepository
  from '../../../infrastructure/repositories/AlbumRepository.js';
import AlbumStorage from '../../../infrastructure/storage/AlbumStorage.js';
import routes from './routes.js';

const UPLOAD_ALBUM_PLUGIN = {
  name: 'upload/album',
  version: '1.0.0',
  register: async (server, {database, publicPath}) => {
    const repository = new AlbumRepository(database);
    const storage = new AlbumStorage(publicPath);
    const handler =
      new UploadAlbumHandler(repository, storage, new UploadAlbumValidator());

    server.route(routes(handler));
  },
};

export default UPLOAD_ALBUM_PLUGIN;
