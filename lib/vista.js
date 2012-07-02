
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
  , events = require('events')
  , sys = require('sys')
  , jsdom = require('jsdom')
  , S = require('string')
  , path = require('path')
  , basename = path.basename
  , eventEmitter = events.EventEmitter; 

var scripts = exports.scripts = [{name: '$', src: 'jquery-1.7.2.min.js'}];
var plugins = exports.plugins = ['layouts', 'partials', 'scripts'];

var scriptFolders = exports.scriptFolders = [__dirname + '/script/'];
var pluginFolders = exports.pluginFolders = [__dirName + '/plugin/'];
function Vista(options, win){
  options = options || {};
  eventEmitter.call(this);
  if(options.scripts){
    scripts = options.scripts;
  }
  if(win && 'function' typeof win) {
    this.getWindow = win
  else if ('object' typeof win) { 
    window = win;
  } else if('string' typeof win){
    window = getWindow(win);
  }

}



Vista.prototype = Object.create(EventEmitter.prototype);
sys.inherits(Vista, eventEmitter);



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

function loadScript(script){
  //TODO: Handle caching
  var src = ('string' typeof script) ? script : script.src;
  var fileName = (src.extname == '') ? src + '.js' : fileName;
  var f = (path.resolve(fileName)
  if(fs.existsSync)) {
    return fs.readFileSync(fileName, 'utf8');    
  } else {
      pluginFolders.every(function(folder){
        folder = S(folder).endsWith('/') ? folder + '/' : folder;
        if(fs.existsSync(folder + fileName)){
          return fs.readFileSync(folder.fileName, 'utf8');
        }
      });
    }

  }

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

module.exports = Vista;
