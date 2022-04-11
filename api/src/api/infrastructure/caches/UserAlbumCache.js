class UserAlbumCache {
  constructor(cache) {
    this.cache = cache;
  }

  async store(id, likes) {
    await this.cache.set(`user-album-likes:${id}`, JSON.stringify({
      data: likes}));
  }

  async get(id) {
    let result = await this.cache.get(`user-album-likes:${id}`);

    if (result) {
      result = JSON.parse(result);

      return result.data;
    } else {
      return null;
    }
  }

  async delete(id) {
    return await this.cache.delete(`user-album-likes:${id}`);
  }
}

export default UserAlbumCache;
