import Response from '../../../../core/utils/Response.js';

class UserAlbumHandler {
  constructor(albumRepository, likeRepository, cache) {
    this.albumRepository = albumRepository;
    this.likeRepository = likeRepository;
    this.cache = cache;

    this.store = this.store.bind(this);
    this.get = this.get.bind(this);
  }

  async store(request, h) {
    const {id: albumId} = request.params;
    const {id: userId} = request.auth.credentials;
    const userAlbum = {userId, albumId};

    await this.albumRepository.getById(albumId);

    const like = await this.likeRepository.isExist(userAlbum);

    if (like) {
      await this.likeRepository.delete(userAlbum);
    } else {
      await this.likeRepository.store(userAlbum);
    }

    await this.cache.delete(albumId);

    return Response.create200Response({
      h,
      message: 'Status disukai pada album berhasil dirubah',
      code: 201,
    });
  }

  async get(request, h) {
    const {id} = request.params;

    let likes = await this.cache.get(id);
    let header = undefined;

    if (likes) {
      header = {
        key: 'X-Data-Source',
        value: 'cache',
      };
    } else {
      likes = await this.likeRepository.countByAlbumId(id);

      await this.cache.set(id, likes);
    }

    likes = parseInt(likes);

    return Response.create200Response({
      h,
      data: {
        likes,
      },
      header,
    });
  }
}

export default UserAlbumHandler;
