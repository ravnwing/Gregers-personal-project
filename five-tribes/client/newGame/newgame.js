Template.newGame.helpers({
  "methodCreation": function(){
    Meteor.call("createCollection", "pull", function(error, result){
      Session.set("selectedGame", result);
    });
  },
  "row0Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(0,6);})[0]
    console.log("row1 passed");
  },
  "row1Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(6,12);})[0]
    console.log("row2 passed");
  },
  "row2Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(12,18);})[0]
    console.log("row3 passed");
  },
  "row3Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(18,24);})[0]
    console.log("row4 passed");
  },
  "row4Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard.slice(24,30);})[0]
    console.log("row 5 passed");
  },

});
