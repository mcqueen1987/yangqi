/**
 * Created by xrain on 16/6/5.
 */

var express = require('express');
var router = express.Router();
var mainController = require('../crawler/controller/main.js');
var groupbuyController = require('../crawler/controller/groupbuy.js');
var unCrawledUrl = require('../crawler/controller/unCrawledUrl.js');

/**
 * 抓取接口
 */
router.all('/crawler/shoplist',function(req,res,next){
	console.log('------------- shoplist api -------------');
	mainController.getShopList();
});

/**
 * 按照key抓取团购信息
 * 只存储url，具体请求url及解析页面由其他接口完成
 */
router.all('/crawler/groupbuy',function(req,res,next){
	console.log('-------------groupbuyController api-------------');
	var params = {};
	params.city = 'beijing';
	params.search_key = '朝阳 健身';
	groupbuyController.crawGroupBuyData(params);
});

/**
 * 获取数据接口，具体参数后续设计
 */
router.all('/crawler/getData',function(req,res,next){
	console.log('-------------getData api-------------');
	var params = {};
	params.city = 'beijing';
	params.search_key = '朝阳 健身';
	groupbuyController.getData(params);
});

/**
 * 从数据库中拿到未抓取的url list，返回给调用方
 * 
 */
router.all('/crawler/getOneUnCrawledUrl',function(req,res,next){
	console.log('-------------getOneUnCrawledUrl api-------------');
	var params = {};
	params.city = 'beijing';
	params.type = 'group_buy';
    params.date = "2017-02-19";
    params.id=1;
    res = "2222";
    // unCrawledUrl.getOneUnCrawledUrl(params, res);
});

/**
 * 解析传来的html并存入数据库
 */
router.all('/crawler/parseAndSaveHtml',function(req,res,next){
	console.log('-------------getOneUnCrawledUrl api-------------');
	var params = {};
	params.city = 'beijing';
	params.type = 'group_buy';
	params.id = '对应UnCrawledUrl表的id，标记为已抓取解析';
	params.html = "html ori page";
	groupbuyController.parseAndSaveHtml(params);
});

module.exports = router;

