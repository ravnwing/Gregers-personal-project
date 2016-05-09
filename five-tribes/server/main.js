import { Meteor } from 'meteor/meteor';

Meteor.methods({
  "createCollection": function(){
    var createUserId = Meteor.userId();
    // Initialize collection
    gameId = GameList.insert({
      createdAt: new Date(),
      Player1: {
        id: createUserId,
        color: "none",
        gold: 50,
        elders: 0,
        vizier: 0,
        slaves: 0,
        hand: [],
        djinn: []
      },
      GameBoard: [],
      MerchDeck: [],
      Marketplace: [],
      DjinnDeck: [],
      AvailDjinn: []
    })


    console.log(gameId);

    //shuffle meeplebag
    var meepleBag = [];
    var tempDeck = MeepleList.find().fetch();

    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        meepleBag.push(tempDeck[rand].type);
        tempDeck.splice(rand, 1);
      }
    }

    // Adds tiles populated with meeple to the collection
    var tempDeck = TileList.find().fetch();
    var drawnItem;
    xpos = 0;
    ypos = 0;
    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      var posId = String("tile_" + xpos + "_" + ypos);
      if (rand != 1) {
        drawnItem = tempDeck[rand];
        tempDeck.splice(rand, 1);
        var assassins = false;
        var builders = false;
        var elders = false;
        var merchants = false;
        var viziers = false;
        var tileMeeple = [];

        for (var i = 0; i < 3; i++) {
          var pulledMeeple = meepleBag.pop();
          tileMeeple.push(pulledMeeple);
          switch (pulledMeeple) {
            case "assassin":
              assassins = true;
              break;
            case "builder":
              builders = true;
              break;
            case "elder":
              elders = true;
              break;
            case "merchant":
              merchants = true;
              break;
            case "vizier":
              viziers = true;
              break;
            default:
              console.log(pulledMeeple);
              console.log("Meeple draw error");
          }
        }

        GameList.update({_id: gameId}, {
          $push: {
            GameBoard: {
              column: xpos,
              row: ypos,
              tileId: posId,
              owner: "none",
              oasis: 0,
              palace: 0,
              m_assassin: assassins,
              m_builder: builders,
              m_merchant: merchants,
              m_vizier: viziers,
              m_elder: elders,
              meeple: tileMeeple,
              score: drawnItem.score,
              type: drawnItem.type,
              source: drawnItem.source
            }
          }
        })


        if (xpos == 5){
          xpos = 0;
          ypos++;
        }
        else {
          xpos++;
        }
      }
    }

    // Adds merchandise and marketplace
    tempDeck = MerchList.find().fetch();

    for (var i = 0; i < 9; i++) {
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        drawnItem = tempDeck[rand];
        tempDeck.splice(rand, 1);

        GameList.update({_id: gameId}, {
          $push: { Marketplace: drawnItem.name }
        })
      }

    }

    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        drawnItem = tempDeck[rand];
        tempDeck.splice(rand, 1);

        GameList.update({_id: gameId}, {
          $push: { MerchDeck: drawnItem.name }
        })
      }
    }

    //Adds djinns to Collection
    tempDeck = DjinnList.find().fetch();

    for (var i = 0; i < 3; i++) {
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        drawnItem = tempDeck[rand];
        tempDeck.splice(rand, 1);

        GameList.update({_id: gameId}, {
          $push: {
            AvailDjinn: drawnItem
          }
        })
      }
    }

    while (tempDeck.length != 0){
      var rand = Math.floor(Math.random()*tempDeck.length);
      if (rand != 1) {
        drawnItem = tempDeck[rand];
        tempDeck.splice(rand, 1);

        GameList.update({_id: gameId}, {
          $push: {
            DjinnDeck: drawnItem
          }
        })
      }
    }
    return gameId;
  },

  "pushMeeple": function(game, tile, type){
    GameList.update({_id: game, "GameBoard.tileId": tile},
                      {$push: {"GameBoard.$.meeple": type}});
    switch (type) {
      case "assassin":
        GameList.update({_id: game, "GameBoard.tileId": tile}, {$set: {"Gameboard.$.m_assassin": true}});
        break;
      case "builder":
        GameList.update({_id: game, "GameBoard.tileId": tile}, {$set: {"Gameboard.$.m_builder": true}});
        break;
      case "elder":
        GameList.update({_id: game, "GameBoard.tileId": tile}, {$set: {"Gameboard.m_elder": true}});
        break;
      case "merchant":
        GameList.update({_id: game, "GameBoard.tileId": tile}, {$set: {"Gameboard.$.m_merhant": true}});
        break;
      case "vizier":
        GameList.update({_id: game, "GameBoard.tileId": tile}, {$set: {"Gameboard.$.m_vizier": true}});
        break;
      default:
        console.log(pulledMeeple);
        console.log("Meeple drop error");
      }
  }

});
