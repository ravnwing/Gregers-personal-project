Template.newGame.helpers({
  "methodCreation": function(){
    Meteor.call("createCollection", "pull", function(error, result){
      Session.set("gamePass", result);
    });
  },
  "sessionCall": function(){
    var gameId = Session.get("gamePass");
    console.log(gameId);
  }

});
