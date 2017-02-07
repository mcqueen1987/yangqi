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
var cookies = require('../../utils/zhihu.js');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();
var controller = {};
var mytable = require('../servlet/mytable.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;

//根据问题查询出该问题以及该问题的答案
function queryAllAnswer(req, res, next) {
    var configMap = _systemConfig.configMap;
    console.log('in controller main.js line 36  ---------');
    console.log(req.toString());
    var quizId = parseInt(req.toString());
    async.series([
        function (callback) {
            console.log(mytable.mytable.toString());
            mytable.mytable.findAll({
                where: {
                    id: quizId
                }
            }).then(function (result) {
                callback(null, result);
            });
        },		//先删除数据库中与该问题相关的数据
    ], function (err, result) {
        if (err) {
            console.log(err);
            res.send('oops!查询出错了');
        } else {
            console.log({quiz: result[0], result: result[1], date: result[0]});
        }
    });
}
controller.queryAllAnswer = queryAllAnswer;

//根据问题查询出该问题以及该问题的答案
function saveShopListToDB(map) {
    console.log('in saveShopListToDB main.js line 36  ---------');
    async.series([
        function (callback) {
            mytable.save(function(result){
                console.log(' ---------------saveShopListToDB call back success in sava data ---------');
            },map);
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
controller.saveShopListToDB = saveShopListToDB;

/**
 * 传入superagent抓取成功后的返回值
 * 返回存有相应数据的map
 * @param result  superagent返回值
 * @param uri     抓取的页面
 * @returns {{}}
 */
var crawlerShopList = function (result, uri) {
    console.log('---------crawlerShopList line 74 -----------' + uri);
    var shopList = {};
    var $ = cheerio.load(result.text);
    // logger.info(result.text);
    var list = {};
    $('#shop-all-list').find("li").each(
        function (index, element) {
            list.push('shop_name', $(element).find(".txt .tit a").attr('title'));
            list.push('shop_href', $(element).find(".txt .tit a").attr('href'));
            list.push('shop_rank_stars', $(element).find(".txt .comment span").attr('title'));
            list.push('shop_comment_num', $(element).find(".txt .comment a b").text());
            list.push('shop_comment_href', $(element).find(".txt .comment a").attr("href"));
            list.push('shop_tag', $(element).find(".txt .tag-addr a span").children().first().text());
            list.push('shop_add_tag', $(element).find(".txt .tag-addr a span").children().eq(1).text());
            list.push('shop_add', $(element).find(".txt .tag-addr .addr").text());
        }
    );
    logger.info(JSON.stringify(list))
    shopList.href = uri;
    shopList.shoplist = list;
    return shopList;
}

/**
 * 根据条件获得工作室列表
 * @param uri
 */
function doGetShopList(callback) {
    var uri = 'http://www.dianping.com/search/keyword/2/0_%E5%A4%A7%E6%82%A6%E5%9F%8E%20%E5%81%A5%E8%BA%AB%E5%B7%A5%E4%BD%9C%E5%AE%A4';
    console.log('---------peopleInfo-----------' + uri);
    superagent
        .get(uri)
        .end(function (err, result){
            var stateus = result.status + '';
            if (err) {
                logger.error('superagent抓取知乎用户详细信息出错:' + err);
                logger.error('url:' + uri + '  返回状态码:' + stateus);
                callback(null);
                return false;
            }
            if (stateus.indexOf('4') === 0 || stateus.indexOf('5') === 0) {
                logger.error('地址uri:' + uri + '  返回状态码:' + result.status);
                logger.error('result.body.message:' + result.body.message);
                callback(null);
            } else {
                //防止出现意外,导致服务停止,try-catch处理
                try {
                    logger.info('用户个人中心地址  line 196 ' + uri);
                    var parsedData = crawlerShopList(result, uri);
                    logger.info('用户个人中心地址  line 198 ' + + JSON.stringify(parsedData));
                    saveShopListToDB({
                        firstName : '22227777777722',
                        lastName : '555577777777755555'
                    });
                    callback("success");
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
function getShopList() {
    console.log('-----------  getPeopleInfo function ---------------');
    var configMap = _systemConfig.configMap;
    console.log('----------- in  getpeople info function ---------------' + JSON.stringify(configMap));
    async.series([
        setTimeout(function () {
            console.log('------getPeopleInfo  --------async.eachSeries ------');
            doGetShopList(function(msg){
                if(msg === 'success'){
                    console.log('===============get parse data success===============');
                }else{
                    console.log('===============get parse data fail===============');
                }
            });
        }, 3000),
    ], function(err) { //This is the final callback
        console.log('oops,出错了!!!' + err);
        logger.error('oops,出错了!!!' + err);
    });
}

controller.doGetShopList = doGetShopList;
controller.getShopList = getShopList;
module.exports = controller;



