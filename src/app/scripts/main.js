/**
 * main.js
 */

'use strict';

var path        = require('path'),
    fs          = require('fs'),
    FileManager = require('./scripts/FileManager');

//Add error event listener
process.on('uncaughtException', function (err) {
    var message = '---uncaughtException---\n' + err.stack + '\n\n';
    fs.appendFile(FileManager.errorLogFile, message);
    jQuery('.koalaui-loading,.koalaui-overlay').remove();
    window.alert(message);
});

window.addEventListener('error', function (err) {
    var message = '---error---\n' + err.filename + ':' + err.lineno + '\n' + err.message + '\n\n';
    fs.appendFile(FileManager.errorLogFile, message);
    jQuery('.koalaui-loading,.koalaui-overlay').remove();
    window.alert(message);
}, false);

//share main context
global.mainWindow = nw.Window.get();
global.jQuery = jQuery;

global.getFileManager = function () {
    return FileManager;
};
global.debug = function (messge) {
    console.log(messge);
};

//cache current active project
global.activeProject = '';

//distinguish between different platforms
$('body').addClass(process.platform);

global.newMenu = function() {
    return new nw.Menu();
};

// render pages && application initialization
require('./scripts/patch.js');
require('./scripts/renderpage.js');
require('./scripts/compilersManager.js');
require('./scripts/initialization.js');