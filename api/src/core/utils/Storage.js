import fs from 'fs';

class Storage {
  static createIfDoesntExist(folder) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, {recursive: true});
    }
  }

  static write(file, folder, filename) {
    const path = `${folder}/${filename}`;
    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

export default Storage;
