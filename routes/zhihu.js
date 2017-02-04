/**
 * Created by xrain on 16/6/5.
 */

var express = require('express');
var router = express.Router();
// var peopleController = require('../crawler/controller/user.js');
// var quizController = require('../crawler/controller/quiz.js');
var mainController = require('../crawler/controller/main.js');
// var followController = require('../crawler/controller/follow.js');

   // localhost:3000/zhihu/chance?q=待爬取问题id
// 爬取指定问题信息
router.all('/chance',function(req,res,next){
	console.log('---------- in routes zhihu chance function ----------------');
	var q = req.query.q;
	var num = parseInt(q);
	if(typeof num === "number"){
		mainController.queryAllAnswer(q);
		res.send('正在爬取,请稍等几分钟');
	}else{
		res.send('请在浏览器输入正确的参数.?q=问题id ');
	}
});

/**
 * 抓取接口
 */
router.all('/crawler',function(req,res,next){
	console.log('-------------crawler-------------');
	var url = req.query.url;
	console.log('--------------------------' + url);
	if(typeof num === "string"){
		mainController.getPeopleInfo(url);
		res.send('正在爬取,请稍等几分钟');
	}else{
		res.send('请在浏览器输入正确的参数.?q=问题id ');
	}
});

router.post('/api', function(req, res) {
	var user_id = req.body.id;
	var token = req.body.token;
	var geo = req.body.innerHTML;
	res.send(user_id + ' ' + token + ' ' + geo);
});

// POST method route
router.post('/post', function (req, res) {
	res.send('POST request to the homepage : post');
});

//已经爬取的问题列表
router.get('/get',function (req, res) {
	// mainController.queryAllQuiz(req, res, next);
	res.send('GET request to the homepage : list');
});

module.exports = router;

