class ExportPlaylistListener {
  constructor(playlistRepository, playlistSongRepository, service) {
    this.playlistRepository = playlistRepository;
    this.playlistSongRepository = playlistSongRepository;
    this.service = service;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const {playlistId, targetEmail} = JSON.parse(message.content.toString());

      const playlist = await this.playlistRepository.getById(playlistId);
      const songs = await this.playlistSongRepository.getByPlaylistId(
          playlistId);

      const content = {
        playlist: {
          ...playlist,
          songs,
        },
      };

      const result =
        await this.service.send(targetEmail, JSON.stringify(content));

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export default ExportPlaylistListener;
