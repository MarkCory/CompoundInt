//Calc.js
app = angular.module("ficalc", []);

app.controller("CalcController", ['$scope', function($scope){
	$scope.figures = {
	salary:0, //gross salary
	contrib:0, //pre-tax contribution
	aftertax:0, //net salary, use to calculate recommended investment
	recommended: 0, //recommended investment
	princ:20000, //How much is already invested
	invested:0, //How much invested annually
	rate:.07, //rate of interest
	compound:1, //how many times it compounds during the year
	yrs:7, //how many years to invest for
	total:0 //total
	roi:0; //returned capital relative to no interest
	}
	$scope.Math = Math;

	$scope.figures.calculateTotal = function(){
		console.log("fired calculation");
		var f;
		var t;
		f = $scope.figures;
		t = f.salary * f.yrs;
		return t;
	}
}]);