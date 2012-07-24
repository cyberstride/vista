
/*!
 * vista
 * Copyright(c) 2012 Chance Dinkins <chance@cyberstride.net>
 * MIT Licensed
 */

/**
 * Library version.
 */

var cheerio = require('cheerio')
  , events = require('events')
  , util = require('util')
  , utils = require('./utils')
  , EventEmitter = events.EventEmitter; 

var scripts = Vista.prototype.scripts = ['layout', 'partial', 'script']
  , scriptDirs = exports.scriptDirs = [__dirname + '/script']
  , self
  , locals
  , options
  , $; 

function Vista(content, options){
  var self = this;
  self.options = options = options || {};
  EventEmitter.call(self);
  if('object' == typeof content){
    options = content;
    content = options.content || options.html || "";
  }
  self.scriptDirs = options.scriptDirs ? options.scriptDirs.concat(scriptDirs) : scriptDirs;
  if(options.scriptDir) {
    self.scriptDirs.unshift(options.scriptDir);
  }
  options = options || {};  
  self.locals = options.locals;
  self.html = content;
  self.locals = options.locals;
  self.options = options;  
  self.scripts = scriptList();
  self.scriptDirs = options.scriptDirs ? options.scriptDirs.concat(scriptDirs) : scriptDirs;
  if(options.scriptDir && 'string' == typeof options.scriptDir && options.scriptDir != ''){
    self.scriptDirs.unshift(option.scriptDir);    
  }
  if(options.viewDir && options.viewDir != ''){
    self.scriptDirs = self.scriptDirs.unshift(options.viewDir);    
  }
  $ = cheerio(content);
  self.emit('init', self);
}

util.inherits(Vista, EventEmitter);

Vista.prototype.execute = function(script, callback){
  var fn;
  fn = new Function('vista, locals, $', script);
  fn(self, self.locals, self.$);
  if(callback && 'function' == typeof callback){
    callback(null, self.$); //not sure if i should return the execution of fn here.. probably? returning self for now.
  }
}
Vista.prototype.compile = function(){
  scripts.each(function(scriptName){
    var script = utils.loadFile({name: scriptName, dirs: self.scriptDirs, extensions: ['js']});
    self.execute(script, function(err, $){
      v.emit(scriptName, $);
    });
  });
  return self.html;
}
Vista.prototype.scriptList = function(){
  if(!options.scripts){
    return scripts;
  }
  var scriptList = options.scripts || [];
  if('object' == typeof scriptList && scriptList.list && scriptList.list.isArray) {
    return scriptList.overwrite ? scriptList.list : scripts.concat(scriptList.list);
  }
  return scriptList.isArray ? scripts.concat(scriptList) : scripts; 
}

module.exports = Vista;