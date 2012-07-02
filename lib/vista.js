
/*!
 * vista
 * Copyright(c) 2012 Chance Dinkins <chance@cyberstride.net>
 * MIT Licensed
 */

/**
 * Library version.
 */
exports.version = '0.0.1';


var fs = require('fs')
  , jsdom = require('jsdom')
  , events = require('events')
  , sys = require('sys');

var eventEmitter = events.EventEmitter;

function Vista(options, window){
  options = options || {};
  eventEmitter.call(this);
  if(options.scripts){
    options.scripts.forEach(function(script){
      _scripts.push(script);
    });
  }
  this.createWindow = options.getWindow || createWindow(window || options.window);
}


var _window = {}
  , _vista = {}
  , _scripts = [];


Vista.prototype = Object.create(EventEmitter.prototype);
sys.inherits(Vista, eventEmitter);

module.exports = Vista;


/**
 * Parse the given `str` with vista and
 *
 * @param {String} str
 * @return {String}
 * @api public
 */
var parse = exports.parse = function(str, options){
 };

/**
 * Compile the given `win` of vista into a `Function`.
 *
 * @param {Window} win
 * @param {Object} options
 * @return {Function}
 * @api public
 */

var compile = exports.compile = function(string, options){
  options = options || {};

  var fn = new Function('locals, modules', str);
  return function(locals){
    return fn.call(this, locals, modules, events);
  };
};

/**
 * Render the given `str` of vista.
 *
 * Options:
 *
 *   - `locals`          Local variables object
 *   - `cache`           Compiled functions are cached, requires `filename`
 *   - `filename`        Used by `cache` to key caches
 *   - `window`          Window in which the execution is occuring.
 *
 * @param {String} str
 * @param {Object} options
 * @return {String}
 * @api public
 */

exports.render = function(str, options){
  var fn
    , options = options || {};

 var input = JSON.stringify(str)
    , filename = options.filename
        ? JSON.stringify(options.filename)
        : 'undefined';
 
  options.__proto__ = options.locals;
  return fn.call(window, options);
};

/**
 * Render a vista file at the given `path` and callback `fn(err, str)`.
 *
 * @param {String} path
 * @param {Object|Function} ions or callback
 * @param {Function} fn
 * @api public
 */

exports.renderFile = function(path, options, fn){
  if ('function' == typeof options) {
    fn = options, options = {};
  }

  options.filename = path;

  try {
    var str = fs.readFileSync(path, 'utf8');
    fn(null, exports.render(str, options));
  } catch (err) {
    fn(err);
  }
};

exports.loadScript = function(path){
  //TODO: Handle caching
  return fs.readFileSync(src, 'utf8')
}

// express support

exports.__express = exports.renderFile;

if (require.extensions) {
  require.extensions['.vis'] = function(module, filename) {
    source = fs.readFileSync(filename, 'utf-8');
    module._compile(compile(source, {}), filename);
  };
} else if (require.registerExtension) {
  require.registerExtension('.vis', function(src) {
    return compile(src, {});
  });
}
