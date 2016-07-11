var myApp = angular.module('myApp',['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
  when('/home',{
    templateUrl:"/views/routes/home.html",
  }).when('/expenseEntry',{
    templateUrl:"/views/routes/expenseEntry.html",
    controller: "expenseSaver"
  }).when('/expenseView',{
     templateUrl:'/views/routes/expenseView.html',
     controller: "expenseViewer"
   }).when('/planYearSetup',{
     templateUrl:'/views/routes/planYear.html',
     controller: "planYearSetup"
  }).otherwise({
    redirectTo:'home'
  });
}]);

myApp.controller('expenseSaver',['$scope','$http', function($scope, $http){
$scope.sendExpense = function(){
  var expenseToSave={
  planYear: $scope.pyIn,
  description: $scope.whatexpenseIn,
  amount:$scope.expenseAmtIn,
  date: $scope.expenseDateIn,
  receipt: $scope.receiptImgIn
};
console.log(expenseToSave);
$http({
 method: 'POST',
 url: '/addExpense',
 data: expenseToSave
});
};
}]);
myApp.controller('expenseViewer',['$scope', '$http', function($scope, $http){
  $scope.expenseTotals = [];
$scope.seeExpenses = function(){
  $http({
   method: 'GET',
   url: '/getExpenses'
}).then(function(response){
  console.log(response.data);
  $scope.allTheExpenses = response.data;
  for (var i = 0; i < response.data.length; i++) {
    $scope.expenseTotals.push(response.data[i].amount);
  }
 $scope.sumTotal = $scope.expenseTotals.reduce(add,0);
  function add (a,b){
    return a+b;
  }
  console.log($scope.expenseTotals);
});
};
}]);
myApp.controller('planYearSetup', ['$scope','$http', function($scope, $http){
  $scope.sendYearInfo = function(){
    var planYearSend = {
    plan_year:$scope.set_plan_year,
    amount_flexed:$scope.amount_flexed
  };
  console.log(planYearSend);
  $http({
    method: "POST",
    url: '/setPlanYear',
    data: planYearSend
  });
  };
}]);
myApp.controller('getPlanYearDeetz', ['$scope', '$http', function($scope, $http){
  $scope.getPlanYearInfo = function(){
    $http({
      method: 'GET',
      url: '/getPlanInfo'
    }).then(function(response){
      $scope.allThePlans = response.data;
    });
  };

}]);
