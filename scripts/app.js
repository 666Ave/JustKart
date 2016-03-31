var app = angular
    .module('Myapp',['ngCookies','geolocation','ui.bootstrap','ngAnimate']);

app.filter('num', function() {
    return function(input) {
       return parseInt(input, 10);
    }
});

app.controller('LocModalInstanceCtrl', function ($scope, $uibModalInstance, location,error) {
	$scope.input="";
  	$scope.location = location;
	$scope.error = error;
	
	$scope.ok = function () {
	$uibModalInstance.close($scope.input);
	};

	$scope.cancel = function () {
	$uibModalInstance.dismiss('cancel');
	};
});

/*.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
    
        //Home
        .state('home',{
            url: '/home',
            templateUrl: 'index.html',
			controller: 'MainController'
        })
    
        .state('productDetails',{
            url: '/productDetails?:pid',
            templateUrl: 'product-details.html',
          controller: function($scope,$http,$stateParams){
				$http.get("api/getProductByID.php",{params:{pid:$stateParams.pid}})
					.success(function(response) {
						$scope.product = response;
						console.log($scope.product);
					})
					.error(function(response){
						console.log('error occured');
					});
			},
			controller: 'MainController'/*,
			resolve: {
				proDService: function($http,$stateParams){
					return $http.get("api/getProductByID.php",{params:{pid:$stateParams.pid}}).then(function(response){
						return response.data;
					})
				}
			
		})
  
        //orders
        .state('orders',{
            url: '/orders',
            templateUrl: 'orders.html'
        })
    
        //help
        .state('help',{
            url: '/help',
            templateUrl: 'help.html'
        })
    
        //myaccount
        .state('myaccount',{
            url: '/myAccount',
            templateUrl: 'myaccount.html'
        })
    
        //cart
        .state('cart',{
            url: '/cart',
            templateUrl: 'cart.html'
        })
    
        //login
        .state('login',{
            url: '/login',
            templateUrl: 'login.html'
        })
	
		//adminpage
		.state('insertproducts',{
            url: '/insertproducts',
            templateUrl: '/Admin_area/insert_product.html',
			controller: 'InsertCtrl'
        })
});*/