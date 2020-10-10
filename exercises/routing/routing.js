const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = ('127.0.0.1');
const port = 3000;

function handleNumbers(req, res) {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;

    let from = parseInt(query.von) || 0;
    let to = parseInt(query.bis) || 50;

    res.writeHeader(200, {"Content-Type": "text/html"});

    (function doLoopTo(i, to) {
        i = (typeof(i) === 'undefined' ? from : i);
        res.write(String(i++) + " ");
        i > to || doLoopTo(i, to);
    })(from, to);
    res.end();
}

function handleFile(res){
    const readFile = function(err){
        fs.readFile('datum.txt', function (err,content){
            res.end(content);
        });
    }

    fs.writeFile('datum.txt', new Date().toLocaleString(), readFile)
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


const server = http.createServer((req,res) => {
    if (req.url.indexOf("/numbers") === 0){
        handleNumbers(req,res);
    }
    else if (req.url === "/file"){
        handleFile(res);
    }else if(req.url === "/ToSendHtml.html"){
        sendFile(res, "ToSendHtml.html", "text/html");
    }else if(req.url === "/ToSendJavaScript.js"){
        sendFile(res, "ToSendJavaScript.js", "text/javascript");
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('You requested' + req.url);
    }
});


server.listen(port,hostname, () => {
    console.log("Server is running on: http://" + hostname + ':' + port + '/');
})
