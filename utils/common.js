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
 */
function getTheDate(){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "_" + month + "_" + day;
    console.log("--5555555555555555---------" + newdate);
    return newdate;
}

common.filePath = filePath;
common.readTextFile = readTextFile;
common.getTheDate = getTheDate;

module.exports = common;
