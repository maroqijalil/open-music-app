const routes = (service) => [
  {
    method: 'POST',
    path: '/songs',
    handler: service.store,
  },
];

export default routes;
