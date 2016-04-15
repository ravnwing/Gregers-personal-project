Template.body.helpers({
  rendered: function(){
    // var tempDeck = [];
    // tileOrder = [];
    // for(var i = 0; i < 30; i++){
    //   tempDeck.push(TileList.find({}))
    // };
    // return tempDeck;
  },
  'newGame': function(){
    tempDeck = [];
    tempDeck = TileList.find().fetch();
    tileDeck = [];

    // for (var i = 0; i < tempDeck.length; i++) {
    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        tileDeck.push(tempDeck[rand]);
        tempDeck.splice(rand, 1);
      }
    };
    Session.set("tilePass", tileDeck);


  },
  'shuffle': function(){
    length = tempDeck.length;
    console.log(tempDeck);
  },

  'tilePosition': function(){
    var x, y;
    position = [];
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 5; j++){
        var temp = String(i) + ", " + String(j);
        position.push(temp);
      }
    }
    return position;
  },
});



Template.tile.helpers({
  'tilePlace': function(){
    var tileDeck = Session.get("tilePass");
    console.log(tileDeck);
    return tileDeck;
  },
});
