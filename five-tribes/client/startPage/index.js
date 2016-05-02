Template.startPage.events({
  "click .game_id": function(){
    var gameId = this._id;
    Session.set('selectedGame', gameId);
    var selectedGameId = Session.get('selectedGame');
  },

  "click #newgame-btn": function(){
    Meteor.call("createCollection", "pull", function(error, result){
      Session.set("selectedGame", result);});
    window.open("/newgame", "_self");

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
