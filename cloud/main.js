
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.afterSave("Trip", function(request) {
  // Our "Comment" class has a "text" key with the body of the comment itself
  var commentText = request.object.get('text');
 
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios');
    
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "New trip: " + commentText
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