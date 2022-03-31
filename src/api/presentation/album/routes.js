const ALBUM_ROUTES = [
  {
    method: 'POST',
    path: '/albums',
  },
  {
    method: 'GET',
    path: '/albums/{id}',
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
  },
];

export default ALBUM_ROUTES;
