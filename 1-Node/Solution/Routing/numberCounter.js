const url = require('url');

module.exports = function handleNumbers(req, res) {
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
};
