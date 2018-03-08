var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var Mine = AV.Object.extend('mine');

// 查询 Todo 列表

router.get('/', function(req, res, next) {

	res.render('mine/bigWebView', {  });

});

router.post('/fun1', function(req, res, next) {


	var name =  "百度贴吧，微信二维码";
	var ip = req.body.IP_Adress;

	var mine = new Mine();
	mine.set('name', name);
	mine.set('IP_Adress', ip);
	mine.save(null, {
    success: function(todo) {
      res.redirect('/bigWebView');
    },
    error: function(err) {
      next(err);
    }
  });

});

module.exports = router;