app.controller('MainController',function($scope,$http,proinfo){
	var self = this;
    $http.get("api/getCat.php")
        .success(function(response) {
            $scope.category = response;
			proinfo.storeCats($scope.category);
        })
        .error(function(response){
            console.log('error occured1');
        });
    
    $http.get("api/getBrand.php")
        .success(function(response) {
            $scope.brands = response;
			proinfo.storeBrands($scope.brands);
        })
        .error(function(response){
            console.log('error occured2');
        });
    
    $http.get("api/getProduct.php")
        .success(function(response) {
            $scope.products = response;
        })
        .error(function(response){
            console.log('error occured3');
        });

});