Template.newGame.helpers({
  "createCollection": function(){
    var createUserId = Meteor.userId();
    GameList.insert({
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
  }
});
