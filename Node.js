let http = require('http');
// process.env.PORTletsthe port beset by Heroku
let port = process.env.PORT|| 8080;

http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("HelloWorld!");
    response.end();
}).listen(port);

console.log("Listeningon port " + port + "...");