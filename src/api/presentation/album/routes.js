const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.store,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getById,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.update,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.delete,
  },
];

export default routes;
