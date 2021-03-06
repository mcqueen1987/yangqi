/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var groupbuy = require('../models/index.js').group_buy;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,maps){
    logger.info(JSON.stringify(maps));
    maps.shoplist.forEach(function(value, index){
        logger.info(JSON.stringify(value));
        groupbuy.build(value).save().then(function(result){
            logger.info('保存 db 表成功' + index);
            callback(result);
        }).catch(function(err){
            logger.error('保存回答表出错:'+err);
        });
    });
};

//根据问题id查询全部回答
servlet.findAll = function(callback, quizId){
    console.log(' in servlet groupbuy.js 28')
    groupbuy.findAll({
        where : {
            id : quizId
        }
    }).then(function(result){
        callback(null,result);
    }).catch(function(err){
        logger.error('根据问题id查询回答出错:'+err);
    });
};

servlet.groupbuy = groupbuy;
module.exports = servlet;
