const http = require('http');
const fs = require('fs');

const handleNumbers = require("./numberCounter");

function handleFile(res) {
    fs.writeFile('datum.txt', new Date().toLocaleString(), function (err) {
        fs.readFile('datum.txt', function (err, content) {
            res.end(content);
        });
    });
}

function sendFile(res, fileName, contentType) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {"Content-Type": contentType});
        res.write(data);
        res.end();
    });
}

http.createServer(function (req, res) {
    if (req.url.indexOf("/numbers") === 0) {
        handleNumbers(req, res);
    }
    else if (req.url === "/file") {
        handleFile(res);
    }
    else if (req.url === "/ToSendHtml.html") {
        sendFile(res, "ToSendHtml.html", "text/html");
    }
    else if (req.url === "/ToSendJavaScript.js") {
        sendFile(res, "ToSendJavaScript.js", "text/javascript");
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('You requested ' + req.url);
    }
}).listen(3002);

console.log('Server running at http://localhost:3002/');
