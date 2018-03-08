




var app_badminton = angular.module("app_badminton", []);



app_badminton.controller("controller1", function($scope) {
	$scope.var1 = "var11111";  // test


	$scope.name_input = "";  // 输入的名字
	$scope.money_input = 0;  // 初始金额

	$scope.people = [];

	$scope.clickAddPeople = function(par1){
		var a1 = $scope;
		console.log("par1 ="+par1);

	};





});




