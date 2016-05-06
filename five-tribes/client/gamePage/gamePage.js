Template.gameLoad.onCreated(function(){
  Meteor.subscribe("gameLoad");
})
Template.gameLoad.onRendered(function(){
  $("#pileInHand").hide();


})
Template.gameLoad.helpers({
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

  "showMeeple": function(){
    var selectedGameId = Session.get("selectedGame");
    var boardArray = GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(function(x){return x.GameBoard;})[0];
    for(i in boardArray){
      if (boardArray[i].m_assassin){
        var identifier = String("#" + boardArray[i].tileId + " .assassin");
        $(identifier).show();
      }
      if (boardArray[i].m_builder){
        var identifier = String("#" + boardArray[i].tileId + " .builder");
        $(identifier).show();
      }
      if (boardArray[i].m_elder){
        var identifier = String("#" + boardArray[i].tileId + " .elder");
        $(identifier).show();
      }
      if (boardArray[i].m_merchant){
        var identifier = String("#" + boardArray[i].tileId + " .merchant");
        $(identifier).show();
      }
      if (boardArray[i].m_vizier){
        var identifier = String("#" + boardArray[i].tileId + " .viz");
        $(identifier).show();
      }
    }

  }

});

Template.gameLoad.events({
  "click .tile": function(){
     var tilename = this.tileId;

     Session.set("startTile", tilename);
     console.log(tilename);
     var meepleOnTile = this.meeple;

     $("#pileInHand").html("");
     for(i in meepleOnTile){
       $("<img class = 'heldMeeple' id='inHand" + i + "' src = '../img/meeple/" + meepleOnTile[i] + ".png'>").data('type', meepleOnTile[i]).appendTo("#pileInHand").draggable({
         containment: ".board",
         stack: ".heldMeeple img",
         revert:   true
       });
     }
     $("#pileInHand").slideDown();


  },

  "mouseover .tile": function(){


  }

});

Template.tile.rendered = function(){
  $(".tile").droppable({
    accept: ".heldMeeple img",
    drop: function(event, ui){
      var tilename = $(this).tileId;
      console.log(tilename);

      ui.draggable.draggable('option', 'revert', false);
      ui.draggable.draggable( 'disable' );
    }
  });
}
