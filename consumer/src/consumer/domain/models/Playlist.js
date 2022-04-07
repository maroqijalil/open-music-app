class Playlist {
  constructor(data) {
    const {
      id,
      name,
    } = data;

    this.id = id ?? '';
    this.name = name ?? '';
  }

  get() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export default Playlist;
