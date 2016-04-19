//Calc.js
app = angular.module("ficalc", []);

app.controller("CalcController", ['$scope', function($scope){
	$scope.figures = {
		salary:null, //gross salary
		contrib:null, //pre-tax contribution
		contribamt:null, //the amount set aside by pre-tax contribution
		taxable:null, //income after pre-tax (401/403) deductions
		assessment:null, //full income tax assessment
		statetax:null, //state taxes.
		netincome:null, //net income.
		recommendrate:.8, //recomended rate of investment (80%)
		recommended: null, //recommended investment
		princ:null, //How much is already invested
		invested:null, //How much invested annually
		rate:.07, //rate of interest
		compound:1, //how many times it compounds during the year
		yrs:null, //how many years to invest for
		ttl:null, //total compounded from principal
		invttl:null, //compounded total with annual investments
		plainttl:null, //total principal contributed
		roi:null //returned capital relative to no interest	
	};
	$scope.calculateTotal = function(){
		// get the basic amount invested
		$scope.figures.plainttl = $scope.figures.invested * $scope.figures.yrs;
		// get the compounded total from annual investments
		$scope.figures.invttl = $scope.figures.invested * (Math.pow((1+$scope.figures.rate/$scope.figures.compound), $scope.figures.compound*$scope.figures.yrs) -1)*$scope.figures.compound/$scope.figures.rate;
		// get the compounded total of the initial principal
		$scope.figures.ttl = $scope.figures.princ * Math.pow((1+$scope.figures.rate/$scope.figures.compound), $scope.figures.compound * $scope.figures.yrs);
		$scope.figures.roi = $scope.figures.invttl - ($scope.figures.invested * $scope.figures.yrs);
		$scope.$digest;
		$scope.$apply;
		console.log($scope.figures)		
		};
	$scope.calculatePostTax = function(){
		// 
		$scope.figures.assessment = null;
		$scope.figures.taxable = $scope.figures.salary - ( $scope.figures.salary * ($scope.figures.contrib/100) );
		$scope.figures.contribamt = $scope.figures.salary * ($scope.figures.contrib/100);
		var taxBracket = [
		{low:0, high:9725, rate:10}, 
		{low:9725, high:37650, rate:15}, 
		{low:37650, high:91150, rate:25}, 
		{low:91150, high:190150, rate:28}, 
		{low:190150, high:413350, rate:33}, 
		{low:413350, high:415050, rate:35}
		];
		userBracket = taxBracket.filter(function(arr){
			// narrows down taxBracket array to brackets lower than user's taxable income.
			return arr.low <= $scope.figures.taxable
		});
		userBracket.map(function(bracket, i, arr){
			//Progressive taxation, loops through each bracket and adds up assessment
			if(i < arr.length - 1){
				//push progressive tax for lower brackets to assessments array
				var bracketMax = parseInt(bracket.high) * (parseInt(bracket.rate)/100);
				$scope.figures.assessment += bracketMax;
			}else{
				// User max bracket
				var assessible = (parseInt($scope.figures.salary) - bracket.low) * (parseInt(bracket.rate)/100) //income above top bracket's low multiplied by top bracket's rate.
				$scope.figures.assessment += assessible; // add top bracket's tax assessment to total assessment

				//calculate net income
				$scope.figures.netincome = ($scope.figures.taxable - $scope.figures.assessment) - ($scope.figures.taxable * ($scope.figures.statetax/100));
			}
		});
		// console.log(userBracket);
		$scope.$digest;
		$scope.$apply;
	}
	$scope.Math = Math;
}])
	// .directive();
