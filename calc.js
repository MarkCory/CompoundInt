//Calc.js
app = angular.module("ficalc", []);

app.controller("CalcController", ['$scope', function($scope){
	$scope.figures = {
		salary:null, //gross salary
		contrib:null, //pre-tax contribution
		match:null, //employer match
		aftertax:null, //net salary, use to calculate recommended investment
		recommended: null, //recommended investment
		princ:null, //How much is already invested
		invested:null, //How much invested annually
		rate:.07, //rate of interest
		compound:1, //how many times it compounds during the year
		yrs:null, //how many years to invest for
		ttl:null, //total compounded from principal
		invttl:null, //compounded total with annual investments
		plainttl:null,
		roi:null //returned capital relative to no interest	
	};
	$scope.calculateTotal = function(){
		$scope.figures.plainttl = $scope.figures.invested * $scope.figures.yrs;
		// console.log("calculateTotal called");
		$scope.figures.invttl = $scope.figures.invested * (Math.pow((1+$scope.figures.rate/$scope.figures.compound), $scope.figures.compound*$scope.figures.yrs) -1)*$scope.figures.compound/$scope.figures.rate;
		// $scope.figures.invttl = $scope.figures.invested * $scope.figures.yrs;
		$scope.figures.ttl = $scope.figures.princ * Math.pow((1+$scope.figures.rate/$scope.figures.compound), $scope.figures.compound * $scope.figures.yrs);
		// $scope.figures.ttl = $scope.figures.princ * $scope.figures.yrs;
		$scope.$digest;
		$scope.$apply;
		console.log($scope.figures)		
		};
	$scope.calculatePostTax = function(){
		$scope.figures.aftertax = ( $scope.figures.salary * ($scope.figures.contrib/100) ) + ($scope.figures.salary * ($scope.figures.match/100));
		var taxBracket = [
		{low:0, high:9725, rate:10}, 
		{low:9725, high:37650, rate:15}, 
		{low:37650, high:91150, rate:25}, 
		{low:91150, high:190150, rate:28}, 
		{low:190150, high:413350, rate:33}, 
		{low:413350, high:415050, rate:35}
		];
		userBracket = taxBracket.filter(function(arr){
			return arr.low < ($scope.figures.salary - $scope.figures.aftertax)
		});
		userBracket.map(function(bracket, i, arr){
			if(i < arr.length - 1){
				console.log("greater than max");
				console.log(bracket);
				console.log(parseInt(bracket.high) * (parseInt(bracket.rate)/100))
			}else{
				console.log("user's bracket");
				console.log(bracket.rate);
			}

		})
		console.log(userBracket);
		$scope.$digest;
		$scope.$apply;
	}
	$scope.Math = Math;
}])
	// .directive();