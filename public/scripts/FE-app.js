var myApp = angular.module('myApp',['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
  when('/home',{
    templateUrl:"/views/routes/home.html",
    controller: "LoginController"
  }).when('/register', {
    templateUrl:"/views/routes/register.html",
    controller: "LoginController"
  }).when('/user', {
    templateUrl: "/views/routes/user.html",
    controller: "UserController"
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
myApp.controller('LoginController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  console.log('log in controller loaded');
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

    $scope.login = function() {
      console.log('login function clicked');
      if($scope.user.username ==='' || $scope.user.password === '') {
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user');
          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong!!";
          }
        });
      }
    };

    $scope.registerUser = function() {
      if($scope.user.username === '' || $scope.user.password === '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again.";
        });
      }
    };
}]);
myApp.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  // This happens after page load, which means it has authenticated if it was ever going to
  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          console.log('User Data: ', $scope.userName);
      } else {
          $window.location.href = '/index.html';
      }
  });

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $window.location.href = '/index.html';
    });
  };
}]);
myApp.controller('expenseSaver',['$scope','$http', function($scope, $http){
$scope.sendExpense = function(){
  console.log('save expense button clicked');
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
  console.log('get expenses button clicked');
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
    console.log('plan year info button clicked');
    $http({
      method: 'GET',
      url: '/getPlanInfo'
    }).then(function(response){
      console.log(response.data);
      $scope.allThePlans = response.data;
    });
  };

}]);
