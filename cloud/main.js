var csv = require('fast-csv');
var request = require('request');
var fs = require('fs');
var util = require('util');
var stream = fs.createReadStream("RCCG.csv");

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');


});

Parse.Cloud.define("notifyUserAboutTrip", function(request, response) {

  var params = request.params;
  var status = request.params.status;
  var message = request.params.message;

  var receiverId = params.receiverId;

  console.log("#### sending push notification to user channel " + receiverId);

  Parse.Push.send({
  	channels: [receiverId],
    data: {
      alert: message,
      sound: 'default'
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR " + error.message);
  }, useMasterKey: true});

  response.success('success');
});


Parse.Cloud.define('setupMetaData', function(req, res) {
  var Church = Parse.Object.extend("Church");
  var church = new Church();
  church.set("name", "test church");
  church.save(null,{
    success:function(church) {
      response.success(church);
    },
    error:function(error) {
      response.error(error);
    }
  });


});


function fetchChurches(){
  var churches = [];
  console.log("inside function");
    var csvStream = csv()
        .on("data", function(data){
            var church = {
               name: sanitize(data[0]),
               address: sanitize(data[1]),
               street : sanitize(data[2]),
               district : sanitize(data[3]),
               city : sanitize(data[4]),
               county : sanitize(data[5]),
               postcode : sanitize(data[6]),
               lat : sanitize(data[6]),
               lng : sanitize(data[7])
            }
            churches.push(church);
        })
        .on("end", function(){
          console.log("finished reading churches file")
        });

    stream.pipe(csvStream);


}
