const jsonServer = require('json-server');
const jsonAuth = require('json-server-auth')
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // <== Will be created later
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000; // <== You can change the port

server.use(jsonAuth)
server.use(middlewares);
server.use(router);

server.listen(port, () => { console.log(`your server started on port ${port}`) });