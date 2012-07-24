
/**
 * Library version.
 */
exports.version = '0.0.1';
var Vista = require('./vista')
  , utils = require('./utils');


exports.render = function(source, options, callback){
  vista = new Vista(source, options);
  callback(null, vista.compile());
};
exports.renderFile = function(path, options, callback){
  if ('function' == typeof options) {
    callback = options, options = {};
  }
  options.filename = path;
  try {
    var source = fs.readFileSync(filename, 'utf8');
  } catch (err) {
    callback(err);
  }
};

// express support
exports.__express = exports.renderFile;
