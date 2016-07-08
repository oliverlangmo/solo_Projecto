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
     controller: "superGetter"
  }).otherwise({
    redirectTo:'home'
  });
}]);

myApp.controller('expenseSaver',['$scope','$http', function($scope, $http){



}]);
