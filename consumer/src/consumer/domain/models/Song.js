/* eslint-disable camelcase */
class Song {
  constructor(data) {
    const {
      id,
      title,
      performer,
    } = data;

    this.id = id ?? '';
    this.title = title ?? '';
    this.performer = performer ?? 0;
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      performer: this.performer,
    };
  }
}

export default Song;
