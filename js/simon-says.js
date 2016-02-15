
exports.simonSays = function( current )
{
  var choices = [ "red", "green", "blue", "yellow" ];
  var next = choices[ Math.floor( Math.random( ) * choices.length ) ];

  current.push( next );
  return current;
}
