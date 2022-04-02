const routes = (service) => [
  {
    method: 'POST',
    path: '/albums',
    handler: service.store,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: service.getById,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: service.update,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: service.delete,
  },
];

export default routes;
