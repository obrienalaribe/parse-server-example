
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
  // Our "Comment" class has a "text" key with the body of the comment itself
 
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