const routes = (service) => [
  {
    method: 'POST',
    path: '/users',
    handler: service.store,
  },
];

export default routes;
