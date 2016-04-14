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
    // TileList.find().forEach(function(doc){
    //   tempDeck.push(doc);
    // });

    for (var i = 0; i < tempDeck.length; i++) {
      var pulledTile;
      var rand = Math.floor(Math.random()*tempDeck.length);;
      tileDeck.push(tempDeck[rand]);
      tempDeck.slice(rand, rand+1);
    };
    console.log(tileDeck);

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
  'tileDeck': function(){
    console.log("fx");
    return tempDeck;
  },
});
