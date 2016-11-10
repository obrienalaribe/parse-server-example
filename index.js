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
var prodCertPathForRider = __dirname + '/certs/Prod_Push_Certificate.p12'

var devCertPathForDriver = __dirname + '/certs/Driver_Prod_Cert.p12'

if (!devCertPathForDriver) {
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
        pfx: prodCertPathForRider, // Prod PFX or P12
        bundleId: 'org.rccg.TransportForChurch',
        production: true 
      }
      // {
      //   pfx: devCertPathForDriver, // Prod PFX or P12
      //   bundleId: 'org.rccg.TransportForChurchDriver',
      //   production: true
      // }
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