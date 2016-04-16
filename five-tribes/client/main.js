Template.body.helpers({
  'newGame': function(){
    tempDeck = [];
    tempDeck = TileList.find().fetch();
    tileDeck = [];

    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        tileDeck.push(tempDeck[rand]);
        tempDeck.splice(rand, 1);
      }
    };
    Session.set("tilePass", tileDeck);

    tempDeck = MerchList.find().fetch();
    merchDeck = [];
    merchant = [];


    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        merchDeck.push(tempDeck[rand]);
        tempDeck.splice(rand, 1);
      }
    };
    Session.set("merchPass", merchDeck);


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
    return tileDeck;
  },
});

Template.merch.helpers({
  'merchShow': function(){
    var merchDeck = Session.get('merchPass');
    var marketplace = [];
    while (marketplace.length <9){
      marketplace.push(merchDeck.pop());
    }
    return marketplace;

  },
});
