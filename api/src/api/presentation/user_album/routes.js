const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: handler.store,
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: handler.get,
  },
];

export default routes;
