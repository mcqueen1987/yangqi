"use strict";


var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname,'..','html','test.html');
console.log(fs.readFileSync(filePath, "utf8"));

var common={};
/**
 * read local text file
 * readTextFile("file:///C:/your/path/to/file.txt");
 * @param file
 */
function readTextFile(path)
{
    var html = fs.readFileSync(filePath, "utf8");
    return html;
}

common.filePath = filePath;
common.readTextFile = readTextFile;

module.exports = common;
