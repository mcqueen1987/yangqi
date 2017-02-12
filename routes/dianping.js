/**
 * Created by xrain on 16/6/5.
 */

var express = require('express');
var router = express.Router();
var mainController = require('../crawler/controller/main.js');
var groupbuyController = require('../crawler/controller/groupbuy.js');

/**
 * 抓取接口
 */
router.all('/crawler/shoplist',function(req,res,next){
	console.log('-------------crawler-------------');
	mainController.getShopList();
});

/**
 * 抓取接口
 */
router.all('/crawler/groupbuy',function(req,res,next){
	console.log('-------------groupbuyController api-------------');
	groupbuyController.crawGroupBuyData();
});

router.post('/api', function(req, res) {
	var user_id = req.body.id;
	var token = req.body.token;
	var geo = req.body.innerHTML;
	res.send(user_id + ' ' + token + ' ' + geo);
});

module.exports = router;

