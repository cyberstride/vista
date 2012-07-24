var vEngine = require('../')
	, Vista = vEngine.Vista
	, should = require('should')
	, path = require('path')
	, jsdom = require("jsdom").jsdom;


describe('Vista', function(){
	describe('constructor', function(){
		describe('options', function(){
			describe('scriptDirs', function(){
				var scriptDirs = new Vista('', {scriptDirs: [__dirname + '/scriptDir1', __dirname + '/scriptDir2'], scriptDir: __dirname + '/scriptDir0'}).scriptDirs;		
				it('should have default values', function(){
					scriptDirs[1].should.match(/scriptDir1$/);
					scriptDirs[2].should.match(/scriptDir2$/);
				});
				it('should inject scriptDir0 to beginning', function(){
					scriptDirs[0].should.match(/scriptDir0/);
				});
			});
			describe('pluginDirs', function(){
				var pluginDirs = new Vista('', { pluginDirs:[__dirname + '/pluginDir1', __dirname + '/pluginDir2'], pluginDir: '/pluginDir0'}).pluginDirs;
				it('should have default values', function(){
					pluginDirs[1].should.match(/pluginDir1$/);
					pluginDirs[2].should.match(/pluginDir2$/);
				});
				it('should inject pluginDir0 to beginning', function(){
					pluginDirs[0].should.match(/pluginDir0/);
				});
			});
		});
		describe('window', function(){
			it('should set the window if available', function(){
	    	var doc = jsdom("<html><body><h1>header</h1></body></html>")
	    		, win = doc.createWindow();
					var vista = new Vista({ window: win});
					console.log(vista);
					should.strictEqual(win, vista.window);
					console.log(vista);

			});
		});
	});
});