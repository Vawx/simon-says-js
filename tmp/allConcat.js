var gameMove = require('./../js/game.js').move;
var gameStart = require('./../js/game.js').startGame;

$(document).ready(function( ) {

  gameStart( );

  $(".square").on("click",function() {
    gameMove(this.id);
  });
});
