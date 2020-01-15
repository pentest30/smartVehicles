var net = require('net');
 
// Configuration parameters
var HOST = '0.0.0.0';
var PORT = 1234;
 
// Create Server instance 
let server = net.createServer(function(sock) {        //Setup server to recieve data
    console.log('Server running on port:' + PORT);
  sock.on('data', function(data) {
        json = data.toString();
        console.log('Recieved data: ' + json);
  } )


  sock.on('close', function(data) {
        console.log('Connection Closed!');
    });

}).listen(PORT, HOST);;