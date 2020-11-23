const http = require('http');
const url = require('url');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'shhh, this is a secret';

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);

    if (parsedUrl.pathname === '/login') {
        const userToken = jwt.sign({ name: 'Jeroen Meeus' }, SECRET_KEY);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(`{"token": "${userToken}"}`);
        res.end();

        return;
    }

    const parsedQuery = querystring.parse(parsedUrl.query);

    // all other cases, verify the token passed in
    if (!parsedQuery.token) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(`{"result": "NO_TOKEN"}`);
        res.end();
    }

    try {
        const payload = jwt.verify(parsedQuery.token, SECRET_KEY);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(`{"result": ${JSON.stringify(payload)}}`);
        res.end();
    } catch(e) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(`{"result": ${JSON.stringify(e)}}`);
        res.end();
    }

}).listen(8000);
