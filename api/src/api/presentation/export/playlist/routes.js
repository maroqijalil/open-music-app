const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: handler.store,
    options: {
      auth: 'open_music_api_jwt',
    },
  },
];

export default routes;
