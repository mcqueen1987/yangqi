"use strict";

var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname,'..','html','test.html');
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

/**
 * get date now 
 * yyyy-mm-dd
 * @returns {Date}
 */
function getDateNow(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    return today;
}

common.filePath = filePath;
common.readTextFile = readTextFile;
common.getDateNow = getDateNow;

module.exports = common;
