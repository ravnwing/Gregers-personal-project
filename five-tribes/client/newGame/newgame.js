Template.newGame.onCreated(function onStartPage(){
  Meteor.subscribe("gameLoad");

})
Template.newGame.helpers({
  // Irrelevant with effective new Game button
  // "methodCreation": function(){
  //   Meteor.call("createCollection", "pull", function(error, result){
  //     Session.set("selectedGame", result);
  //   });
  // },

  "row0Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(0,6);})[0]
  },
  "row1Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(6,12);})[0]
  },
  "row2Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(12,18);})[0]
  },
  "row3Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(18,24);})[0]
  },
  "row4Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(24,30);})[0]
  },

});

Template.newGame.events({
  "click .tile": function(){
     var tilename = this.score;
     console.log(tilename);
  }
});
