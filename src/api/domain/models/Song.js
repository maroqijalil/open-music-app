/* eslint-disable camelcase */
class Song {
  constructor(data) {
    const {
      id,
      title,
      year,
      performer,
      genre,
      duration,
      album_id,
    } = data;

    this.id = id ?? '';
    this.title = title ?? '';
    this.year = year ?? 0;
    this.performer = performer ?? 0;
    this.genre = genre ?? 0;
    this.duration = duration ?? 0;
    this.album_id = album_id ?? 0;
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      year: this.year,
      performer: this.performer,
      genre: this.genre,
      duration: this.duration,
      albumId: this.album_id,
    };
  }
}

export default Song;
