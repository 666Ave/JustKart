var app = angular
    .module('Myapp',[
        'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
    
        //Home
        .state('home',{
            url: '/home',
            templateUrl: 'index.html'
        })
    
        //product details and other nested views
        /*.state('productDetail',{
            url: '/productDetails',
            templateUrl: 'product-details.html'
        })*/
    
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
});