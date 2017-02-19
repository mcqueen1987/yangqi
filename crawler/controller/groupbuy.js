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
var groupbuy = require('../servlet/groupbuy.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;
var common = require('../../utils/common.js')

//根据问题查询出该问题以及该问题的答案
function saveGroupBuyToDB(map) {
    console.log('in saveGroupBuyToDB groupbuy.js line 19 ---------');
    async.series([
        function (callback) {
            groupbuy.save(function (result) {
                console.log(' --------groupbuy saveGroupBuyToDB call back success in sava data ---------' + result);
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
controller.saveGroupBuyToDB = saveGroupBuyToDB;

/**
 * 对单个页面进行解析，不包括翻页
 */
var crawlerGroupBuy = function (html, params) {
    var url_pre = "http://t.dianping.com";
    var shopList = {};
    var $ = cheerio.load(html);
    logger.info("-------------- 33333 get the result-------555555--");
    var shop_list_data = [];
    $('.tg-list li.tg-floor-item').each(
        function (index, element) {
            var list = {};
            list.shop_href = $(element).find("a.tg-floor-img").attr("href");
            list.deal_id = list.shop_href.match(/\/([0-9]+)/)[1];
            var time = common.getTheDate();
            list.shop_id = time.toString() + "_" + list.deal_id;
            list.shop_name = $(element).find("a.tg-floor-title h3").text();
            var floorTitle = $(element).find("a.tg-floor-title h4").text();
            list.shop_add_tag = floorTitle.match(/\[(.*?)]/)[1];
            list.shop_price_new = $(element).find("span.tg-floor-price-new em").text();
            list.shop_price_old = $(element).find("span.tg-floor-price-old del").text();
            list.shop_sold = $(element).find("span.tg-floor-sold").text().replace(/已售/, "");
            list.date = new Date();
            list.deleted_at = "2038-01-01";
            list.city = params.city;
            list.search_key = params.search_key;
            shop_list_data.push(list);
        }
    );
    logger.info(JSON.stringify(shop_list_data));
    shopList.shoplist = shop_list_data;
    return shopList;
}

/**
 * generate crawler url by params
 * @param params
 */
function generateUrlByParams(params){
    if(Object.prototype.toString.call( params ) === '[object Array]' ){
        var city = params.city;
        var keys = params.search_key;
        //http://t.dianping.com/list/beijing?q=%E6%9C%9D%E9%98%B3++%E5%81%A5%E8%BA%AB+%E7%A7%81%E6%95%99
        var url = encodeURI('http://t.dianping.com/list/' + city + '?q=' + keys);
        return url;
    }else{
        return false;
    }
}

/**
 * 获取翻页中的页面数
 */
function getPageNum(html){
    if(html == "") return null;
    var $ = cheerio.load(html);
    var pageNum = $("#paginator").find("a").eq(4).text();
    return pageNum;
}

/**
 * 根据条件获得工作室列表
 * @param uri
 */
function doCrawGroupBuyData(callback, params) {
    // var uri = "http://t.dianping.com/list/beijing?q=%E6%9C%9D%E9%98%B3++%E5%81%A5%E8%BA%AB+%E7%A7%81%E6%95%99";
    logger.info("  params is =====" + params);
    var url = generateUrlByParams(params);
    console.log('--------- doCrawGroupBuyData 106-----------' + url);

    //test get html from local
    // var path = '/root/yangqi/utils/common.js';
    // var html1 = common.readTextFile(path);
    
    //get html by http
    var html1 = getHtmlByGet(url);
    // 1 获得总页数
    var pageNum = getPageNum(html1);
    logger.info("----------- page num is :" + pageNum);

    //翻页抓取
    for(var i=1; i<pageNum; i++){
        //抓取页面
        var url = "" + i;
        // var htmlTmp = getHtmlByGet(url); //
        // //解析页面
        // var parsedData = crawlerGroupBuy(htmlTmp, params);
        // saveGroupBuyToDB(parsedData);
        // callback("success");
    }

    // superagent
    //     .get(uri)
    //     .end(function (err, result){
    //         var stateus = result.status + '';
    //         if (err) {
    //             logger.error('superagent抓取知乎用户详细信息出错:' + err);
    //             logger.error('url:' + uri + '  返回状态码:' + stateus);
    //             callback(null);
    //             return false;
    //         }
    //         if (stateus.indexOf('4') === 0 || stateus.indexOf('5') === 0) {
    //             logger.error('地址uri:' + uri + '  返回状态码:' + result.status);
    //             logger.error('result.body.message:' + result.body.message);
    //             callback(null);
    //         } else {
    //             try {
    //                 var parsedData = crawlerGroupBuy(result, params);
    //                 saveGroupBuyToDB(parsedData);
    //                 callback("success");
    //             } catch (e) {
    //                 logger.error('出错的html:' + result.text);
    //                 console.dir(e);
    //                 console.error('错误' + e);
    //                 callback(null);
    //             }
    //         }
    //     });
}

/**
 * 获取html页面api
 * get api
 */
function getHtmlByGet(url){
    if(url == "") return false;
    superagent
        .get(url)
        .end(function (err, result){
            var statusCode = result.status + '';
            if (err) {
                logger.error('superagent抓取html页面api出错:' + err);
                logger.error('url:' + url + '  返回状态码:' + statusCode);
                callback(null);
                return false;
            }
            if (statusCode.indexOf('4') === 0 || statusCode.indexOf('5') === 0) {
                logger.error('地址url:' + url + '  返回状态码:' + statusCode);
                logger.error('result.body.message:' + result.body.message);
                callback(null);
            } else {
                try {
                    // var parsedData = crawlerGroupBuy(result, params);
                    // saveGroupBuyToDB(parsedData);
                    logger.info("------getHtmlByGet function, uri = " + url + "-----html is:" + result.text);
                    callback("success");
                    return result.text;
                } catch (e) {
                    logger.error('出错的html:' + result.text);
                    console.dir(e);
                    console.error('错误' + e);
                    callback(null);
                }
            }
        });

}

/**
 * 根据搜索条件获的某地区工作室列表
 */
function crawGroupBuyData(params) {
    console.log('-----------  crawGroupBuyData function ---------------');
    var configMap = _systemConfig.configMap;
    console.log('----------- in  crawGroupBuyData function ---------------' + JSON.stringify(configMap));
    async.series([
        setTimeout(function () {
            console.log('------crawGroupBuyData  --------async.eachSeries ------');
            doCrawGroupBuyData(function (msg) {
                if (msg === 'success') {
                    console.log('===============get parse data success===============');
                } else {
                    console.log('===============get parse data fail===============');
                }
            }, params);
        }, 3000),
    ], function (err) { //This is the final callback
        console.log('oops,出错了!!!' + err);
        logger.error('oops,出错了!!!' + err);
    });
}

controller.crawGroupBuyData = crawGroupBuyData;
module.exports = controller;



