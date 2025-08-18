require('dotenv').config();

const http = require('http');

const app = require('./app');

console.log('JWT KEY:', process.env.JWT_KEY);

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port);

console.log('Server is working');
