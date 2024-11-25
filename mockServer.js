var http = require('http');

/*** ARGS ***/
var PORT = 1234, MOCK_FOLDER = "Mocks";

process.argv.forEach(function(val, index, array) {
    if (val.indexOf("mockPort") !== -1) {
        PORT = val.split("=")[1];
    }
    if (val.indexOf("mockFolder") !== -1) {
        MOCK_FOLDER = val.split("=")[1];
    }
});

/*** SERVER ***/
var server = http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    try {
        console.log("REQUEST METHOD ------> " + req.method);

        var cleanUrl = req.url.split("?")[0];
        var urlLastPortion = cleanUrl.substring(cleanUrl.lastIndexOf("/") + 1);
        var mockUrl = cleanUrl.substring(0, cleanUrl.lastIndexOf(urlLastPortion) + 1) + req.method + urlLastPortion;
        var jsonStr = JSON.stringify(require("../" + MOCK_FOLDER + "/" + mockUrl + ".json"));

        console.log("RESPONSE ------> " + jsonStr);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(jsonStr);
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end("Error: " + err);
    }
});

server.listen(PORT);
