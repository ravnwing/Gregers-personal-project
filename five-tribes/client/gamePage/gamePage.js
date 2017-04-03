Template.gameLoad.onCreated(function(){
  Meteor.subscribe("gameLoad");
})

Template.gameLoad.onRendered(function(){
  $("#pileInHand").hide();
  var selectedGameId = Session.get("selectedGame");
  setTimeout(function(){
  var boardArray = GameList.find({_id:selectedGameId},
    {GameBoard: 1}).fetch().map(function(x){return x.GameBoard;})[0];
  console.log(boardArray);

  for(i in boardArray){
    $("#" + boardArray[i].tileId).data('arrayplace', boardArray[i]._id);
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
      var identifier = String("#" + boardArray[i].tileId + " .vizier");
      $(identifier).show();
    }
    if (boardArray[i].oasis != 0){
      var identifier = String("#" + boardArray[i].tileId + " .oasis");
      $(identifier).show();
    }
    if (boardArray[i].palace != 0){
      var identifier = String("#" + boardArray[i].tileId + " .palace");
      $(identifier).show();
    }
  }
}, 750);


})

Template.gameLoad.helpers({
  "row0Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}).fetch().map(function(x){
      return x.GameBoard.slice(0,6);})[0]
  },
  "row1Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}).fetch().map(function(x){
      return x.GameBoard.slice(6,12);})[0]
  },
  "row2Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(
      function(x){return x.GameBoard.slice(12,18);})[0]
  },
  "row3Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(
      function(x){return x.GameBoard.slice(18,24);})[0]
  },
  "row4Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(
      function(x){return x.GameBoard.slice(24,30);})[0]
  },

  "showMeeple": function(){
    var selectedGameId = Session.get("selectedGame");
    var boardArray = GameList.find({_id:selectedGameId}, {GameBoard: 1}).fetch().map(
      function(x){return x.GameBoard;})[0];
    for(i in boardArray){
      $("#" + boardArray[i].tileId).data('arrayplace', boardArray[i]._id);
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
        var identifier = String("#" + boardArray[i].tileId + " .vizier");
        $(identifier).show();
      }
    }
  },

  "market0Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id: selectedGameId}).fetch().map(function(x){
      return x.Marketplace.slice(0,3);})[0]
  },
  "market1Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id: selectedGameId}).fetch().map(function(x){
      return x.Marketplace.slice(3,6);})[0]
  },
  "market2Call": function(){
    var selectedGameId = Session.get("selectedGame");
    return GameList.find({_id: selectedGameId}).fetch().map(function(x){
      return x.Marketplace.slice(6,9);})[0]
  },

});

Template.gameLoad.events({
  "click .tile": function(){
    var lasttile = Session.get("startTile");
    var draggingMeeple = false;
    draggingMeeple = Session.get("dragging");
    if(!draggingMeeple){
      if(lasttile){
        if(lasttile.m_assassin){
          $("#"+ lasttile.tileId + " .assassin").show()
        }
        if(lasttile.m_builder){
          $("#"+ lasttile.tileId + " .builder").show()
        }
        if(lasttile.m_elder){
          $("#"+ lasttile.tileId + " .elder").show()
        }
        if(lasttile.m_merchant){
          $("#"+ lasttile.tileId + " .merchant").show()
        }
        if(lasttile.m_vizier){
          $("#"+ lasttile.tileId + " .vizier").show()
        }
      }

      var draggingLength = this.meeple.length;
      Session.set("dragCount", draggingLength);
      var tilename = this.tileId;
      Session.set("startTile", this);
      var meepleOnTile = this.meeple;

      $("#pileInHand").html("");
      for(i in meepleOnTile){
        $("<img class = 'heldMeeple' id='inHand" + i + "' src = '../img/meeple/" + meepleOnTile[i] + ".png'>").data('type', meepleOnTile[i]).appendTo("#pileInHand").draggable({
          containment: ".board",
          stack: ".heldMeeple img",
          revert:   true,
          drag: function(event, ui){
            var draggingMeeple = true;
            Session.set("dragging", draggingMeeple);
          }
        });
       }
       $("#pileInHand").slideDown();
       $("#" + tilename + " .assassin").hide();
       $("#" + tilename + " .builder").hide();
       $("#" + tilename + " .elder").hide();
       $("#" + tilename + " .merchant").hide();
       $("#" + tilename + " .vizier").hide();
  }},

});

Template.tile.onRendered(function(){
  $(".tile").droppable({
    accept: '.heldMeeple',
    drop: function (event, ui) {
      var selectedGameId = Session.get("selectedGame");
      var firsttile = Session.get("startTile");
      var firstId = firsttile._id;
      var dropTile = this.id;
      var droppedMeeple = ui.draggable.data('type');
      var thisId = $(this).data('arrayplace');
      Meteor.call("pushMeeple", selectedGameId, thisId, droppedMeeple, function(error, result){});
      var identifier = String("#" + dropTile + " ." + droppedMeeple);
      $(identifier).show()
      ui.draggable.remove().html();
      Meteor.call("dropMeeple", selectedGameId, firstId, droppedMeeple);
      var draggingLength = Session.get("dragCount")
      draggingLength--;
      if (draggingLength == 0){
        Session.set("dragging", false);
        firsttile.m_assassin = false;
        firsttile.m_builder = false;
        firsttile.m_elder = false;
        firsttile.m_merchant = false;
        firsttile.m_vizier = false;
        Session.set("startTile", firsttile);
        var lasttile = GameList.find({_id:selectedGameId}).fetch().map(function(x){return x.GameBoard.slice(thisId, thisId+1);})[0];
        var type = lasttile[0].type;
        Meteor.call("lastDrop", selectedGameId, thisId, type, droppedMeeple);
        if (type == "oasis") {
          $("#" + dropTile + " .oasis").show();
          Bert.alert('<h2>This tile discovered an oasis</h2>', 'success', 'growl-top-right');
        }
        else if (type == "village") {
          $("#" + dropTile + " .palace").show();
          Bert.alert('<h2>This tile built a palace</h2>', 'success', 'growl-top-right');
        }
      }
      else{
        Session.set("dragCount", draggingLength)
      }
    }
  });
})
