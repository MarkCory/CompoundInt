//Calc.js
app = angular.module("ficalc", []);

app.controller("CalcController", ['$scope', function($scope){
	$scope.figures = {
		salary:null, //gross salary
		contrib:null, //pre-tax contribution
		aftertax:null, //net salary, use to calculate recommended investment
		recommended: null, //recommended investment
		princ:null, //How much is already invested
		invested:null, //How much invested annually
		rate:.07, //rate of interest
		compound:1, //how many times it compounds during the year
		yrs:null, //how many years to invest for
		ttl:null, //total compounded from principal
		invttl:null, //compounded total with annual investments
		roi:null //returned capital relative to no interest	
	};
	$scope.calculateTotal = function(){
		// console.log("calculateTotal called");
		$scope.figures.invttl = $scope.figures.invested * (Math.pow((1+$scope.figures.rate/$scope.figures.compound), $scope.figures.compound*$scope.figures.yrs) -1)*$scope.figures.compound/$scope.figures.rate;
		// $scope.figures.invttl = $scope.figures.invested * $scope.figures.yrs;
		$scope.figures.ttl = $scope.figures.princ * Math.pow((1+$scope.figures.rate/$scope.figures.compound), $scope.figures.compound * $scope.figures.yrs);
		// $scope.figures.ttl = $scope.figures.princ * $scope.figures.yrs;
		$scope.$digest;
		$scope.$apply;
		console.log($scope.figures)		
		};
	$scope.Math = Math;
}])
	// .directive();