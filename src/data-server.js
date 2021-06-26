const http = require('http');

const hostname = '127.0.0.1';
const port = 56789;
const data = [];

const server = http.createServer((req, res) => {
  console.log('data count:', data.length);
  console.log('current:', data[data.length - 1]);

  if (req.url !== '/getNext') return;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(data.pop());
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
