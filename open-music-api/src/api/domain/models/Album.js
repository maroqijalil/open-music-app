class Album {
  constructor(data) {
    const {
      id,
      name,
      year,
    } = data;

    this.id = id ?? '';
    this.name = name ?? '';
    this.year = year ?? 0;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
    };
  }
}

export default Album;
