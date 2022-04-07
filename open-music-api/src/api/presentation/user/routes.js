const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.store,
  },
];

export default routes;
