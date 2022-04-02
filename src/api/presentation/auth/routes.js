const routes = (service) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: service.store,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: service.update,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: service.delete,
  },
];

export default routes;
