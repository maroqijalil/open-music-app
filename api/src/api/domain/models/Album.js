/* eslint-disable camelcase */

class Album {
  constructor(data) {
    const {
      id,
      name,
      year,
      cover_url,
    } = data;

    this.id = id ?? '';
    this.name = name ?? '';
    this.year = year ?? 0;
    this.coverUrl = cover_url ?? null;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      coverUrl: this.coverUrl,
    };
  }
}

export default Album;
