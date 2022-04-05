const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.store,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.get,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.delete,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
];

export default routes;
