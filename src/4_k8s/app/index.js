const http = require('http');

http.createServer((req, res) => {
    setTimeout(() => {
        res.writeHead(200);
        res.end(`Hello from ${process.pid}`);
    }, 1000)
}).listen(3000);

console.log(`Worker ${process.pid} started`);
