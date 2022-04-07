class Playlist {
  constructor(data) {
    const {
      id,
      name,
      username,
    } = data;

    this.id = id ?? '';
    this.name = name ?? '';
    this.username = username ?? 0;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
    };
  }
}

export default Playlist;
