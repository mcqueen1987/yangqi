/**
 * Created by public on 2016/6/15.
 */
var moment = require('moment');
var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var url = require('url');
var qs = require('querystring');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();
var controller = {};
var unCrawledUrl = require('../servlet/unCrawledUrl.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;
var common = require('../../utils/common.js')

//根据问题查询出该问题以及该问题的答案
function doGetOneUnCrawledUrl(callback, map) {
    console.log('in getDataFromDB ---------');
    async.series([
        function () {
            unCrawledUrl.getOne(function (str, result) {
                console.log(' --------groupbuy saveGroupBuyToDB ---------' + JSON.stringify(result));
                callback(result);
            }, map);
        },		//先删除数据库中与该问题相关的数据
    ], function (err, result) {
        if (err) {
            console.log(err);
            res.send('oops! save data 出错了');
        } else {
            console.log({quiz: result[0], result: result[1], date: result[0]});
        }
    });
}

/**
 * 获取未抓取过的url给调用方
 */
function getOneUnCrawledUrl(params) {
    async.series([
        setTimeout(function () {
            console.log('------getOneUnCrawledUrl  --------async.eachSeries ------');
            doGetOneUnCrawledUrl(function (result) {
                if (result !== '') {
                    console.log('=============== getOneUnCrawledUrl data success===============');
                } else {
                    console.log('=============== getOneUnCrawledUrl data fail===============');
                    return false;
                }
            }, params);
        }, 3000),
    ], function (err) { //This is the final callback
        console.log('oops,出错了!!!' + err);
        logger.error('oops,出错了!!!' + err);
    });
}

controller.getOneUnCrawledUrl = getOneUnCrawledUrl;
module.exports = controller;



