Template.startPage.onCreated(function onStartPage(){
  Meteor.subscribe("gameByUser");
})

Template.startPage.onRendered(function(){
  $(".loadgame-list").hide();
})


Template.startPage.events({
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
    $(".loadgame-list").slideDown();
  }
});

Template.startPage.helpers({
  "gameloadList": function(){
    var currentuser = Meteor.userId();
    return GameList.find();
  },
  // "selectedClass": function(){
  //   var gameId = this._id;
  //   var selectedGameId = Session.get('selectedGame');
  //   if (gameId == selectedGameId){
  //     return "selected";
  //   }
  // },

})
