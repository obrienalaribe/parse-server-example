// Example express application adding the parse-server module to expose Parse
// compatible API routes.
"use strict"
var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var devCertPathForRider = __dirname + '/certs/Dev_Push_Certificate.p12'

var driverDevCert = __dirname + '/certs/Driver_Dev.p12';
var driverProdCert = __dirname + '/certs/Driver_Prod.p12'


if (!driverDevCert) {
    console.log('MUPPET ITS BECAUSE IT CANNOT READ FILE');
}

var api = new ParseServer({
  serverURL: "https://insta231.herokuapp.com/parse",
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey',
  push: {
    ios: [
      {
        pfx: devCertPathForRider, // Dev PFX or P12
        bundleId: 'org.rccg.TransportForChurch',
        production: false // Dev
      },
      {
        pfx: driverDevCert,
        bundleId: 'org.rccg.TransportForChurchDriver',
        production: false // Dev
      },
      {
        pfx: driverProdCert,
        bundleId: 'org.rccg.TransportForChurchDriver',
        production: true // Dev
      }
    ]
  }

});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

var minutes = 10, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("Keeping Server ALIVE every " + minutes + " minutes");
}, the_interval);
