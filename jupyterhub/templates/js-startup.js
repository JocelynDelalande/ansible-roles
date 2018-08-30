// {{ ansible_managed }}

/*
 * Custom startup script to ease programming learning with ijavascript notebooks :
 *
 * - Wrap every cell execution with Fiber
 * - Offer the following non-standard JavaScript functions
 *   - alert(<msg>) : alias to console.log
 *   - prompt(<msg>) : browser-like, synchronous
 *   - afficheLigne(<nbTirets>) : draws a line on screen
 *
 * /!\ That startup script prevents global scope from being shared among cells /!\
 *
 */
var Fiber = require('fibers');

global.alert = function (msg) {
  console.log(msg);
};

/* Wrap every execution into fiber environment
*
* To allow synchronous magic happen
*/
var runInThisContext = vm.runInThisContext;

vm.runInThisContext = function(code) {
    runInThisContext("Fiber(function() {" + code + "}).run();");
};

/** Synchronous sleep-like function for JavaScript
 *
 * Used to implement busy loops (ugly for performance, but sometimes, that is
 * not what most matters).
 */
function fiberSleep(ms) {
	var fiber = Fiber.current;
	setTimeout(function() {
		fiber.run();
	}, ms);
	Fiber.yield();
}

/** Synchronously prompts the user for a string
 *
 * Similar to the prompt() function on browsers. Returns the typed value.
 */
global.prompt = function(msg) {
  var ret;
  var ready = false;
  $$.input({prompt: msg+ ' ', password: false}, function(err, msg) {
    ret = msg;
    ready = true;
    $$.done();
  });
  while (!ready) {
    fiberSleep(100);
  }
  return ret;
};


global.afficheLigne = function(nbTirets) {
  var l = '';
  for (var i=0; i < nbTirets; i++) {
    l += '-';
  }
  alert(l);
};
