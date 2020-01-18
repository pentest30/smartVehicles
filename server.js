var net = require('net');
var Parse = require('parse/node');

Parse.initialize("8e207ab717fc666494e38973c099fa517fc06b54", "", "4bfc0581b5c418af92bfc104cdf4aa01a89cb2e1");
//javascriptKey is required only if you have it on server.

Parse.serverURL = "http://13.233.229.47:80/parse/"

var Vehicles = Parse.Object.extend("Vehicles");
 
// Configuration parameters
var HOST = '0.0.0.0';
var PORT = 1235;

let imei,keywords,ymdhm,simNo,gpsStatus,hms,lat,latDir,lon,lonDir,speed,alt,acc,door,oil1,oil2,temp ;

async function saveVehical() {

	var date = new Date(null);
	date.setSeconds(hms); // specify value for SECONDS here
	hms = date.toISOString().substr(11, 8);

	imei = imei.split(':')[1];
	temp = temp.split(';')[0];
	oil1 = oil1.split('%')[0];
	oil2 = oil2.split('%')[0];

	console.log('imei: ' + imei);
        console.log('temp: ' + temp);
        console.log('sim no: ' + simNo);

        const query = new Parse.Query(Vehicles);
        query.equalTo("imei", imei);
        const results = await query.find();
        query.limit(1);

        if(results.length > 0){
        	let vehicles = results[0];
        	vehicles.set('imei',imei);
        	vehicles.set('keywords',keywords);
        	vehicles.set('ymdhm',ymdhm);
        	vehicles.set('simNo',simNo);
        	vehicles.set('gpsStatus',gpsStatus);
        	vehicles.set('hms',hms);
        	vehicles.set('lat',lat);
        	vehicles.set('latDir',latDir);
        	vehicles.set('lon',lon);
        	vehicles.set('lonDir',lonDir);
        	vehicles.set('speed',speed);
        	vehicles.set('alt',alt);
        	vehicles.set('acc',acc);
        	vehicles.set('door',door);
        	vehicles.set('oil1',oil1);
        	vehicles.set('oil2',oil2);
        	vehicles.set('temp',temp);

        	vehicles.save()
        	.then((gameScore) => {
  				// Execute any logic that should take place after the object is saved.
  				console.log('Object saved with objectId: ' + vehicles.id);
				}, (error) => {
  				// Execute any logic that should take place if the save fails.
  				// error is a Parse.Error with an error code and message.
 					 console.log('Failed to create new object, with error code: ' + error.message);
				});

        }else{
        	let vehicles = new Vehicles();
        	vehicles.set('imei',imei);
        	vehicles.set('keywords',keywords);
        	vehicles.set('ymdhm',ymdhm);
        	vehicles.set('simNo',simNo);
        	vehicles.set('gpsStatus',gpsStatus);
        	vehicles.set('hms',hms);
        	vehicles.set('lat',lat);
        	vehicles.set('latDir',latDir);
        	vehicles.set('lon',lon);
        	vehicles.set('lonDir',lonDir);
        	vehicles.set('speed',speed);
        	vehicles.set('alt',alt);
        	vehicles.set('acc',acc);
        	vehicles.set('door',door);
        	vehicles.set('oil1',oil1);
        	vehicles.set('oil2',oil2);
        	vehicles.set('temp',temp);

        	vehicles.save()
        	.then((gameScore) => {
  				// Execute any logic that should take place after the object is saved.
  				console.log('New object created with objectId: ' + vehicles.id);
				}, (error) => {
  				// Execute any logic that should take place if the save fails.
  				// error is a Parse.Error with an error code and message.
 					 console.log('Failed to create new object, with error code: ' + error.message);
				});

        }

}
 
// Create Server instance 
let server = net.createServer(function(sock) {        //Setup server to recieve data
    console.log('Server running on port:' + PORT);
  sock.on('data', function(data) {
        json = data.toString();

        let dat = json.split(',');

        console.log('Recieved data: ' + dat);
        imei = dat[0] ;
        keywords = dat[0 +1];
        ymdhm = dat[1+1];
        simNo =  dat[2+1];
        gpsStatus = dat[3+1];
        hms = dat[4+1];
        lat = dat[7];
        latDir = dat[8];
        lon = dat[9];
        lonDir = dat[10];
        speed = dat[11];
        alt = dat[13];
        acc = dat[14];
        door = dat[15];
        oil1 = dat[16];
        oil2 = dat[17];
        temp = dat[18];

        saveVehical();


  } )


  sock.on('close', function(data) {
        console.log('Connection Closed!');
    });

}).listen(PORT, HOST);;