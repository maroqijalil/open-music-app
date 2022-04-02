const routes = (service) => [
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: service.store,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: service.get,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: service.delete,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
];

export default routes;
