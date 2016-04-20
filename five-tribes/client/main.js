Template.gameStart.helpers({
  'newGame': function(){
    tempDeck = [];
    count = 0;
    tempDeck = TileList.find().fetch();
    tileRow0 = [];
    tileRow1 = [];
    tileRow2 = [];
    tileRow3 = [];
    tileRow4 = [];
    tileDeck = [];

    while (tempDeck.length != 0){
      if (count < 6){
        var rand = Math.floor(Math.random()*tempDeck.length);
        if (rand != 1) {
          tileRow0.push(tempDeck[rand]);
          tempDeck.splice(rand, 1);
          count++;
        }
      }
      else if(count < 12){
        var rand = Math.floor(Math.random()*tempDeck.length);
        if (rand != 1) {
          tileRow1.push(tempDeck[rand]);
          tempDeck.splice(rand, 1);
          count++;
        }
      }
      else if (count < 18) {
        var rand = Math.floor(Math.random()*tempDeck.length);
        if (rand != 1) {
          tileRow2.push(tempDeck[rand]);
          tempDeck.splice(rand, 1);
          count++;
        }
      }
      else if (count < 24){
        var rand = Math.floor(Math.random()*tempDeck.length);
        if (rand != 1) {
          tileRow3.push(tempDeck[rand]);
          tempDeck.splice(rand, 1);
          count++;
        }
      }
      else {
        var rand = Math.floor(Math.random()*tempDeck.length);
        if (rand != 1) {
          tileRow4.push(tempDeck[rand]);
          tempDeck.splice(rand, 1);
          count++;
        }
      }
    };
    Session.set("row0Pass", tileRow0);
    Session.set("row1Pass", tileRow1);
    Session.set("row2Pass", tileRow2);
    Session.set("row3Pass", tileRow3);
    Session.set("row4Pass", tileRow4);


    tempDeck = MerchList.find().fetch();
    merchDeck = [];

    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        merchDeck.push(tempDeck[rand]);
        tempDeck.splice(rand, 1);
      }
    };
    Session.set("merchPass", merchDeck);


  tempDeck = DjinnList.find().fetch();
  djinnDeck = [];

  while (tempDeck.length != 0){
    var rand = Math.floor(Math.random()*tempDeck.length);
    if (rand != 1) {
      djinnDeck.push(tempDeck[rand]);
      tempDeck.splice(rand, 1);
    }
  };
  Session.set("djinnPass", djinnDeck);
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
  'row0Place': function(){
    var tileRow0 = Session.get("row0Pass");
    return tileRow0;
  },
  'row1Place': function(){
    var tileRow1 = Session.get("row1Pass");
    return tileRow1;
  },
  'row2Place': function(){
    var tileRow2 = Session.get("row2Pass");
    return tileRow2;
  },
  'row3Place': function(){
    var tileRow3 = Session.get("row3Pass");
    return tileRow3;
  },
  'row4Place': function(){
    var tileRow4 = Session.get("row4Pass");
    return tileRow4;
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

Template.djinn.helpers({
  'djinnShow': function(){
    djinnDeck = Session.get("djinnPass")
    var availDjinn = [];
    while (availDjinn.length <3){
      availDjinn.push(djinnDeck.pop());
    }
    return availDjinn;
  }
})
