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
    console.log(quizId);
    console.log('---------------------');
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
function saveMyTable(map) {
    console.log('in saveMyTable main.js line 36  ---------');
    async.series([
        function (callback) {
            mytable.save(function(result){
                console.log(' --------------- call back success in sava data ---------');
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
controller.saveMyTable = saveMyTable;

/**
 * 传入superagent抓取成功后的返回值
 * 返回存有相应数据的map
 * @param result  superagent返回值
 * @param uri     抓取的页面
 * @returns {{}}
 */
var crawlerPeopleAbout = function (result, uri) {
    var cZUser = {};
    var $ = cheerio.load(result.text);
    cZUser.href = uri;
    cZUser.title = $('title').text();
    return cZUser;
}


/**
 * 传入用户的个人中心详细页面url,截取内容并且保存到数据库中
 * @param uri
 */
function peopleInfo(callback) {
    var uri = 'www.baidu.com';
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
                    var parsedData = crawlerPeopleAbout(result, uri);
                    logger.info('用户个人中心地址  line 198 ' + + JSON.stringify(parsedData));
                    saveMyTable({
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
 * 查询list表中符合条件的数据放入数组中,循环处理
 */
function getPeopleInfo() {
    console.log('-----------  getPeopleInfo function ---------------');
    var configMap = _systemConfig.configMap;
    console.log('----------- in  getpeople info function ---------------' + JSON.stringify(configMap));
    async.series([
        setTimeout(function () {
            console.log('------getPeopleInfo  --------async.eachSeries ------');
            peopleInfo(function(msg){
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

controller.peopleInfo = peopleInfo;
controller.getPeopleInfo = getPeopleInfo;
module.exports = controller;



