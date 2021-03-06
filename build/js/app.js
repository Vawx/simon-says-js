(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var simonSays = require('./../js/simon-says.js').simonSays;
var colors = ["red","blue","chartreuse","yellow"];
var moves = [];
var flashCount = 0;
var userCount = 0;
var gameStates = ["displayPattern", "waitingForInput","lose"];
var currentGameState = gameStates[2];

exports.startGame = function( )
{
    $("#header").text("Simon Says");
    moves.push( colors[ Math.floor(Math.random( ) * colors.length) ] );
    currentGameState = gameStates[0];
    displayPatternToUser();
}

exports.move = function( current )
{
  if(currentGameState === gameStates[1])
  {
    if(current === moves[userCount])
    {
      userCount += 1;
      if( userCount >= moves.length)
      {
        currentGameState = gameStates[0];
        flashCount = 0;
        userCount = 0;
        moves.push( colors[ Math.floor(Math.random( ) * colors.length) ] );
        interval(displayPatternToUser, 125, 1);
      }
    }
    else
    {
      $("#header").text("Survived " + moves.length + " moves!");
      moves = [];
      flashCount = 0;
      userCount = 0;
      currentGameState = gameStates[2];
    }
  }
}

exports.running = function( )
{
  return currentGameState !== gameStates[2];
}

function displayPatternToUser()
{
  if(currentGameState === gameStates[0])
  {
    resetToDullColor(moves[flashCount - 1]);
    interval(flashReset, 550, 1);
    flashColor( );
    flashCount += 1;
  }
}

function flashColor( )
{
  if(flashCount < moves.length)
  {
    $("#" + moves[flashCount]).css("background-color", moves[flashCount]);
  }
  else
  {
    flashCount = 0;
    currentGameState = gameStates[1];
  }
}

function flashReset( )
{
  interval(displayPatternToUser, 125, 1);
}

function resetToDullColor(color)
{
  switch(color)
  {
    case "red":
      $("#" + color).css("background-color", "rgb(120,10,10)");
    break;
    case "yellow":
      $("#" + color).css("background-color", "rgb(120,120,10)");
    break;
    case "chartreuse":
      $("#" + color).css("background-color", "rgb(10,120,10)");
    break;
    case "blue":
      $("#" + color).css("background-color", "rgb(10,10,120)");
    break;
  }
}

/** Fix for setInterval( ) -- Thanks to: https://gist.github.com/richardkundl/7673746 */
function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};

},{"./../js/simon-says.js":2}],2:[function(require,module,exports){

exports.simonSays = function( current )
{
  var choices = [ "red", "green", "blue", "yellow" ];
  var next = choices[ Math.floor( Math.random( ) * choices.length ) ];

  current.push( next );
  return current;
}

},{}],3:[function(require,module,exports){
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

},{"./../js/game.js":1}]},{},[3]);
