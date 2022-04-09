import * as path from 'path';
import Storage from '../../../core/utils/Storage.js';

class AlbumStorage {
  constructor(publicPath, name = 'img/album') {
    this.folder = path.resolve(publicPath, name);

    Storage.createIfDoesntExist(this.folder);
  }

  write(file, meta) {
    const filename = new Date() + meta.filename;
    return Storage.write(file, this.folder, filename);
  }
}

export default AlbumStorage;
