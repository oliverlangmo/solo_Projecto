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
http({
 method: 'POST',
 url: '/addExpense',
 data: expenseToSave
});
};
}]);
myApp.controller('expenseViewer',['$scope', '$http', function($scope, $http){
$scope.seeExpenses = function(){
  $http({
   method: 'GET',
   url: '/getExpenses'
}).then(function(response){
  $scope.allTheExpenses = response.data;
});
};

}]);
