
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');


  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios');
    
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "New trip created " 
    }
  }, {
    success: function() {
      // Push was successful
        res.success('Push was sent');
    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
    }
  });

});

Parse.Cloud.afterSave("Trip", function(request) {
 
   query = new Parse.Query("Trip");
   var tripStatus = request.object.get("status")

   if (tripStatus == "Requested") {
   	   console.log("TRIP REQUESTED OO ");
   }



  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios');
    
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "New trip created " 
    }
  }, {
    success: function() {
      // Push was successful
    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
    }
  });
});

Parse.Cloud.define("iosPushTest", function(request, response) {

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
      alert: "Message: " + messageText
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});