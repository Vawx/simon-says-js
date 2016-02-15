var simonSays = require('./../js/simon-says.js').simonSays;
var colors = ["red","blue","chartreuse","yellow"];
var moves = ["red"];
var flashCount = 0;
var userCount = 0;
var gameStates = ["displayPattern", "waitingForInput"];
var currentGameState;

exports.startGame = function( )
{
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
      else
      {

      }
    }
    else
    {
      $("#header").text("Lose!");
    }
  }
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
