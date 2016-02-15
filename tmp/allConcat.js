var gameMove = require('./../js/game.js').move;
var gameStart = require('./../js/game.js').startGame;
var gameRunning = require('./../js/game.js').running;

$(document).ready(function( ) {

  $("#start-button").on("click",function( ){
    if(!gameRunning( ))
    {
      gameStart( );
    }
  });


  $(".square").on("click",function() {
    gameMove(this.id);
  });
});
