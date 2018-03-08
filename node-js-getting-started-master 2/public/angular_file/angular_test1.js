




var an_test1 = angular.module("an_test1", []);



an_test1.controller("controller1", function($scope) {
	$scope.var1 = "var11111";  // test



	$scope.peopleData = [];

	$scope.test1 = function(par1){
		var a1 = $scope;
		console.log("par1 ="+par1);

	};

	$scope.test2 = function(par1){
		console.log("in test 2  par1 = "+par1);
		$scope.peopleData = par1;
	};

	$scope.test3 = function(par1){
		console.log("par1 = "+par1);
		// var c1 = par1.get('name');
		var c2 = "aaa";
		for (temp in par1)
		{
			console.log("temp = "+temp);
			var ttt = 34;
		}
		// console.log("c1 = "+c1);
		return "ggg";
	};




});




