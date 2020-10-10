const http = require('http');
const fsPromises = require('fs').promises;

const handleNumbers = require("./numberCounter");


async function handleFile(res) {
    await fsPromises.writeFile('datum.txt', new Date().toLocaleString());
    res.end(await fs.readFile('datum.txt'));
}

async function sendFile(res, fileName, contentType) {
    const data = await fsPromises.readFile(fileName);
    res.writeHeader(200, {"Content-Type": contentType});
    res.write(data);
    res.end();
}

http.createServer(async function (req, res) {
    if (req.url.indexOf("/numbers") === 0) {
        handleNumbers(req, res);
    }
    else if (req.url === "/file") {
        await handleFile(res);
    }
    else if (req.url === "/ToSendHtml.html") {
        await sendFile(res, "ToSendHtml.html", "text/html");
    }
    else if (req.url === "/ToSendJavaScript.js") {
        await sendFile(res, "ToSendJavaScript.js", "text/javascript");
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('You requested ' + req.url);
    }
}).listen(3002);

console.log('Server running at http://localhost:3002/');
