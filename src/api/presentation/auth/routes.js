const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.store,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.update,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.delete,
  },
];

export default routes;
