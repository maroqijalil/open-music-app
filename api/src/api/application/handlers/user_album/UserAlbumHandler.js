import Response from '../../../../core/utils/Response.js';

class UserAlbumHandler {
  constructor(repository) {
    this.repository = repository;

    this.store = this.store.bind(this);
    this.get = this.get.bind(this);
  }

  async store(request, h) {
    const {id: albumId} = request.params;
    const {id: userId} = request.auth.credentials;
    const userAlbum = {userId, albumId};

    const like = await this.repository.isExist(userAlbum);

    if (like) {
      await this.repository.delete(userAlbum);
    } else {
      await this.repository.store(userAlbum);
    }

    return Response.create200Response({
      h,
      message: 'Status disukai pada album berhasil dirubah',
      code: 201,
    });
  }

  async get(request, h) {
    const {id} = request.params;

    const likes = await this.repository.countByAlbumId(id);

    return Response.create200Response({
      h,
      data: {
        likes,
      },
    });
  }
}

export default UserAlbumHandler;
