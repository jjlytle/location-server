const {
	Stitch,
	RemoteMongoClient,
	AnonymousCredential,
} = require('mongodb-stitch-server-sdk');

const delay = require('delay');

var app_id	= 'location-service-oktga';
var dbname          = 'test';
var collectionName  = 'points ';
var filename        = './data/run1.csv';
var timeNow 		= 1543835415241
var timeDiv			= 50
var fs          = require('fs');
var readline    = require('readline');
var stream      = require('stream');
var instream    = fs.createReadStream(filename);
var outstream   = new stream;
var rl          = readline.createInterface(instream,outstream);
var startLong   = -122.437608
var startLat    = 47.244769


console.log('***************Process started');
// Use the API Key to load data
const stitchClient = Stitch.initializeDefaultAppClient(app_id);

stitchClient.auth.loginWithCredential(new AnonymousCredential())
.then(() => {
	generateData(stitchClient);
});

function generateData(stitchClient)
{

	console.log('***************Successfully connected to mongodb');


	console.log('***************Parsing, please wait ...');

	rl.on('line', function(line){
		var arr = line.split(',');
		var myobj =
		{
			name: "run1",
			time: timeNow+=timeDiv,
			startingCoord: { type: "Point", coordinates: [startLong, startLat]},
			location: { type: "Point", coordinates: [arr[0], arr[1]] }
		};
		stitchClient.callFunction('location', [myobj]).catch(function(value) {
			console.log(value);
		});
		delay(100);
	});

	rl.on('close', function() {
		stitchClient.close();
		console.log('***************completed');
	});
}

let gpsToFeet = (long, lat, x, y) => {
	let longLat = Object();
	longLat[0] = long + ((x/1000)*(90/10000));
	longLat[1] = lat + ((y/1000)*(90/10000));
	return longLat;
}

let latLongToM = (num) => {
	return (num * (10000.0/90.0))*1000.0
}

let MtoLatLong = (num) => {
	return (num/1000.0) * (90.0/10000.0)
}
