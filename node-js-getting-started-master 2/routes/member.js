var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象


var Member = AV.Object.extend('member');

router.get('/', function(req, res, next) {
	var query = new AV.Query(Member);
	query.find({
    success: function(results) {
      res.render('member', { 
        people: results,
      });
    },
    error: function(err) {
      next(err);
    }
  });

});

router.post('/addPeople', function(req, res, next) {
  var input_name = req.body.input_name;
  var input_money = parseInt(req.body.input_money);
  var member = new Member();
  member.set('name', input_name);
  member.set('initMoney', input_money);
  member.save(null, {
    success: function(todo) {
      res.redirect('/member');
    },
    error: function(err) {
      next(err);
    }
  });
});




module.exports = router;