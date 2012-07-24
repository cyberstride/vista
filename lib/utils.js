var fs = require('fs')
  , path = require('path')

module.exports.loadFile = function(options, callback){
  options = options || {};
  var file = ('string' == typeof options) ? options : options.file || options.name;
  if(!file || file == '') {
    return throwError(type ? type : 'file can not be blank.');
  }
  var extname = path.extname(options.file);
  extname = (extname == '.') ? '' : extname;
  if(path.dirname(file) != ''){
    var filePath = path.normalize(file);
    if(fs.existsSync(filePath)) {
      var content = fs.readFileSync(filePath, 'utf8');
      if(callback && 'function' == typeof callback){
        callback(null, content);
      }
      return fileContent;  
    } else {
      return throwError(type ? type : 'File'  + ' "' + path + '" not found.');
    }
  }
  else { //
    options.extension = options.extension || '';
    options.extensions = options.extension != '' ? (option.extensions || []).unshift(option.extension) : option.extensions;
    if(extname != ''){
      options.extensions.unshift(extname);
      file = path.basename(file, extname);
    }
    options.dirs = options.dirs || [];
    options.dirs = (option.dir && option.dir != '') ? options.dirs.unshift(options.dir) : options.dirs;
    dirs.every(function(dir){
      options.extensions.each(function(ext){
        var filePath = path.normalize((folder + path.sep +  file + '.' + ext).replace('..', '.'));
        if(fs.existsSync(filePath)) {
          var content = fs.readFileSync(filePath, 'utf8');
          if(callback && 'function' == typeof callback){
            callback(null, content);
          }
          return fileContent;  
        }          
      });
    });
  }
}
var throwError = module.exports.throwError = function(message, callback){
  if(callback && 'function' == typeof callback){
    callback(new Error(message));
    return null;
  } else {
    throw new Error(message);
  }
}
