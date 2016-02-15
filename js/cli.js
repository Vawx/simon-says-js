var simonSays = require('./simon-says.js').simonSays;

var current = [ "red", "green", "blue", "yellow", "red", "blue" ];
current.forEach( function( element ) {
  console.log( simonSays( current ) );
});
