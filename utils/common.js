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
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                logger.info(allText);
                return allText;
            }
        }
    }
    rawFile.send(null);
}

function getLocalFile(path)
{
    var html = fs.readFileSync(filePath, "utf8");
    return html;
}

common.filePath = filePath;
common.getLocalFile = getLocalFile;
common.readTextFile = readTextFile;

module.exports = common;
