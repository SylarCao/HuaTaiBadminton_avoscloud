var router = require('express').Router();
var AV = require('leanengine');

var CodeMember = AV.Object.extend('codeReviewMember');
var codeReview = AV.Object.extend('codeReview');

var m_all_people_data = [];
var m_all_people_name = [];   // 人名字的array
var m_sort_array = [];    // array of uid
var m_error_code = "";
var m_content = "a->b->c->a";

router.get('/', function(req, res, next) {
	// get all member
	var query = new AV.Query(CodeMember);
	query.find({
    success: function(results) {
    	m_all_people_data = results;
    	m_all_people_name = [];
    	for (var i=0; i<results.length; i++)
    	{
    		var object_i = results[i];
    		var name_i = object_i.get('name');
    		m_all_people_name.push(name_i);
    	}
			// get last sort
			var query_last = new AV.Query(codeReview);
			query_last.descending('createdAt');
				query_last.find({
			    success: function(results) {
			    	var first_object = results[0];
			    	m_sort_array = first_object.get('sort');
			    	m_content = first_object.get('content');
			    	show(res);
			    },
			    error: function(err) {
			      if (err.code === 101) {
			      	next(err);
			      } else {
			        next(err);
			      }
			    }
			  });
    },
    error: function(err) {
      if (err.code === 101) {
      	next(err);
      } else {
        next(err);
      }
    }
  });
});

function show(res){
	res.render('codeReview/codeReview', {
		m_sort_array: m_sort_array, m_all_people_name: m_all_people_name, m_error_code: m_error_code, m_content: m_content
  });
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
	}
	return array;
};

function getNameWithUid(uid){
	var rt = "";
	m_all_people_data.forEach(function(each_people){  
		var each_uid = each_people.get('uid');
		if (each_uid == uid)
		{
			rt = each_people.get('name');
			// break;   不知道如何 break
		}
	});
	return rt;
};


router.post('/getArray', function(req, res, next){

	// 判断是不是礼拜一
	var now_time = new Date();
	var week_day = now_time.getDay();
	if (week_day == 1)  // 判断是不是礼拜一
	{
		// 去服务器上获取数据
		var query_last = new AV.Query(codeReview);
		query_last.descending('createdAt');
		query_last.find({
	    success: function(results) {
	    	var first_object = results[0];
	    	var last_update_time = first_object.createdAt;
	    	var delta_time =  now_time - last_update_time;
	    	console.log("dd = "+delta_time);
	    	if (delta_time > 1000 * 3600 * 0)  //  判断超过1天 毫秒为单位
	    	{
	    		// 超过了一天了， 可以上传
	    		var content = "";
	    		var shuffled_array = shuffleArray(m_sort_array);
	    		for (var i=0; i<shuffled_array.length; i++)
	    		{
	    			var uid_i = shuffled_array[i];
	    			// update到服务器
	    			var name_i = getNameWithUid(uid_i);
	    			content = content + name_i + "  ->  ";
	    		}
	    		// 把第一名加到最后
	    		var uid_0 = shuffled_array[0];
	    		var name_0 = getNameWithUid(uid_0);
	    		content = content + name_0;

	    		// 上传服务器
	    		var code_review = new codeReview();
				  code_review.set('content', content);
				  code_review.set('sort', shuffled_array);
				  code_review.save(null, {
				    success: function(data) {
				    	m_content = content;
				    	show(res);
				    },
				    error: function(err) {
				      next(err);
				    }
				  });
	    	}
	    	else
	    	{
	    		m_error_code = "这个礼拜已经刷新过了";
	    		show(res);
	    	}
	    },
	    error: function(err) {
	      if (err.code === 101) {
	      	next(err);
	      } else {
	        next(err);
	      }
	    }
	  });
	}
	else
	{
		m_error_code = "不是礼拜一，不能刷新";
		show(res);
	}
});




router.post('/test1', function(req, res, next) {

	var query = new AV.Query(Code);
	query.equalTo('valid', true);
	query.first({
	  success: function(object) {
	  	object.set('sort', [2,3,4,5,6]);
	  	object.save(null, {
			  success: function(post) {
			    // 成功保存之后，执行其他逻辑.
			    res.render('codeReview/codeReview', {result: post });
			  },
			  error: function(post, error) {
			    // 失败之后执行其他逻辑
			    // error 是 AV.Error 的实例，包含有错误码和描述信息.
			  }
			});
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});

  
});


module.exports = router;