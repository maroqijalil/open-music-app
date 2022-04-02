const routes = (playlistService, playlistSongService) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: playlistService.store,
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: playlistService.get,
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: playlistService.delete,
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: playlistSongService.store,
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: playlistSongService.get,
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: playlistSongService.delete,
  },
];

export default routes;
