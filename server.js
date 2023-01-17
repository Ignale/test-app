import { create, router, defaults } from 'json-server';
const server = create();
const router = router('db.json'); // <== Will be created later
const middlewares = defaults();
const port = 5000; // <== You can change the port

server.use(middlewares);
server.use(router);

server.listen(port);