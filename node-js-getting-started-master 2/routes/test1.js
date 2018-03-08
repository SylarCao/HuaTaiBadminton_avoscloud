var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var Todo = AV.Object.extend('Todo');

var Member = AV.Object.extend('member');

// 查询 Todo 列表
router.get('/', function(req, res, next) {
	var query = new AV.Query(Member);
	query.find({
    success: function(results) {
      res.render('test1', {
        people: results,
        todo: "my todo",
      });
    },
    error: function(err) {
      next(err);
    }
  });





	// AV.Cloud.run('hello', {}, {
	// 	   success: function(data){
	// 	      //调用成功，得到成功的应答data
	// 	      console.log("in routes/test1.js --------------")
	// 	      console.log(data);
	// 	      res.render('test1', {todo: data});
	// 	   },
	// 	   error: function(err){
	// 	      //处理调用失败
	// 	      console.log(err);
	// 	   }
	//  });
  
});


// 新增 Todo 项目
router.post('/addPeople', function(req, res, next) {
  var input_name = req.body.input_name;
  var input_money = parseInt(req.body.input_money);
  var member = new Member();
  member.set('name', input_name);
  member.set('initMoney', input_money);
  member.save(null, {
    success: function(todo) {
      res.redirect('/test1');
    },
    error: function(err) {
      next(err);
    }
  })
})

// var app_badminton = angular.module("app_badminton", []);



// app_badminton.controller("controller1", function($scope) {

//   $scope.var1 = "var11111";  // test


//   $scope.name_input = "";  // 输入的名字
//   $scope.money_input = 0;  // 初始金额

//   $scope.people = [];

//   $scope.clickAddPeople = function(){
//     var people_name = $scope.name_input;
//     var money = $scope.money_input;
//      AV.Cloud.run('addPeople', {name: people_name, money :money}, {
//        success: function(data){
//           //调用成功，得到成功的应答data
//           alert("success");
//           console.log(data);
//        },
//        error: function(err){
//           //处理调用失败
//           console.log(err);
//           alert("fail");
//        }
//      });
//   };





// });


module.exports = router;