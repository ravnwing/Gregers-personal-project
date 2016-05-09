

Template.startPage.onCreated(function onStartPage(){
  Meteor.subscribe("gameByUser");
})


Template.startPage.events({
  "click .game_id": function(){
    var gameId = this._id;
    Session.set('selectedGame', gameId);
    var selectedGameId = Session.get('selectedGame');
  },

  "click #newgame-btn": function(){
    Meteor.call("createCollection", function(error, result){
      Session.set("selectedGame", result);
    });
    setTimeout(function(){
      var selectedGameId = Session.get('selectedGame');
      var gameURL = "/game/" + selectedGameId;
      window.open(gameURL, "_self");
    }, 1000);
  },

  "click #loadgame-btn": function(){
    var selectedGameId = Session.get('selectedGame');
    var gameURL = "/game/" + selectedGameId;
    window.open(gameURL, "_self");
  }
});

Template.startPage.helpers({
  "gameloadList": function(){
    var currentuser = Meteor.userId();
    return GameList.find();
  },
  "selectedClass": function(){
    var gameId = this._id;
    var selectedGameId = Session.get('selectedGame');
    if (gameId == selectedGameId){
      return "selected";
    }
  },

})
