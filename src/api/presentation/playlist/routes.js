const routes = (service) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: service.store,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: service.get,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: service.delete,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
];

export default routes;