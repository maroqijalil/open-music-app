class Album {
  constructor({
    id,
    name,
    year,
  }) {
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
