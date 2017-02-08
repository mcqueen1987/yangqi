/**
 * Created by public on 2016/6/14.
 */

console.log(' in servlet mytable.js 28');
var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var mytable = require('../models/index.js').mytable;
console.log(' in servlet mytable.js 28');
console.log(mytable.toString());

servlet.mytable = mytable;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,maps){
    logger.info(JSON.stringify(maps));
    maps.shoplist.forEach(function(value, index){
        logger.info(JSON.stringify(value));
        mytable.build(value).save().then(function(result){
            logger.info('保存 db 表成功' + index);
            callback(result);
        }).catch(function(err){
            logger.error('保存回答表出错:'+err);
        });
    });
    // mytable.build(map).save().then(function(result){
    //     logger.info('保存CZAnswer表成功');
    //     callback(result);
    // }).catch(function(err){
    //     logger.error('保存回答表出错:'+err);
    // });
};

//根据问题id查询全部回答
servlet.findAll = function(callback, quizId){
    console.log(' in servlet mytable.js 28')
    mytable.findAll({
        where : {
            id : quizId
        }
    }).then(function(result){
        callback(null,result);
    }).catch(function(err){
        logger.error('根据问题id查询回答出错:'+err);
    });
};

module.exports = servlet;
