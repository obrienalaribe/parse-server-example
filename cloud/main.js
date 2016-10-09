
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');


});

Parse.Cloud.define("notifyRiderForAcceptedTrip", function(request, response) {

  var params = request.params;

  var riderId = params.riderId;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only                                                                                                                                          

  Parse.Push.send({
  	channels: [riderId],
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "The driver is on their way ",
      sound: 'default'

    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR " + error.message);
  }, useMasterKey: true});

  response.success('success');
});


Parse.Cloud.define("broadcastMessage", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  var user = request.user;

  var messageText = params.text;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only                                                                                                                                          

      console.log("#### READY TO SEND PUSH");

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "Message: " + messageText,
      sound: 'default'

    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR " + error.message);
  }, useMasterKey: true});

  response.success('success');
});