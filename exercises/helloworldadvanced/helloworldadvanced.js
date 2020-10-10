const http = require('http');
const url = require('url');

const hostname = ('127.0.0.1');
const port = 3000;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader = ('Content-Type', 'text/plain');
    const urlObject = url.parse(req.url, true);
    res.end('You requested ' + urlObject.pathname);
});


server.listen(port,hostname, () => {
    console.log("Server is running on: http://" + hostname + ':' + port + '/');
})
