const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.store,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.get,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getById,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.update,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.delete,
  },
];

export default routes;
