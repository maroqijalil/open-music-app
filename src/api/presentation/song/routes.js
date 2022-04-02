const routes = (service) => [
  {
    method: 'POST',
    path: '/songs',
    handler: service.store,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: service.get,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: service.getById,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: service.update,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: service.delete,
  },
];

export default routes;
