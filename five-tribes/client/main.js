Template.body.helpers({
  'newGame': function(){
    tempDeck = [];
    count = 0;
    tempDeck = TileList.find().fetch();
    tileRow = [];
    tileDeck = [];

    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        tileDeck.push(tempDeck[rand]);
        tempDeck.splice(rand, 1);
        count++;
      }
      // if (count == 6){
      //   tileDeck.push(tileRow);
      //   count = 0;
      //   tileRow = [];
      // }
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
  'rowPlace': function(){
    var tileDeck = Session.get("tilePass");
    var tileRow = [];

    for (var i = 0; i < 6; i++) {
      tileRow.push(tileDeck.pop());
    }

    return tileRow;
  },




  'tilePlace': function(){
    var tileDeck = Session.get("tilePass");
    return tileDeck;
  },
  'rowCounter': function(){
    count++;
    space = false
    if ((count%6 == 0) && (count < 25)) {
      space = true;
    }
    else{
      space = false
    }
    return space;
  }
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
