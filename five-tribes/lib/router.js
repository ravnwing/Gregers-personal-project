Router.route('/', {
  template: "startPage"
});

Router.route('/test',{
  template: "cssTest"
});

Router.route('/game/:_id', function(){
  this.render('gameLoad', {
    data: function(){
      var currentGame = this.params._id;
      Session.set("selectedGame", currentGame);
      return GameList.findOne({_id:currentGame});
    }
  })
});

Router.route('/newgame',{
  template: "newGame"
});


// backup
// Router.route('/game/:_id', {
//   template: "gameLoad",
//   data: function(){
//     var currentGame = this.params._id;
//     GameList.findOne({_id:currentGame});
//   }
// });
