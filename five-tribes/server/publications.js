Meteor.publish("gameByUser", function(){
  var currentUserId = this.userId;
  return GameList.find({"Player1.id": currentUserId});
});

Meteor.publish("gameLoad", function(){
  var currentUserId = this.userId;
  return GameList.find();
});
