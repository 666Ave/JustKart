app.controller('MainController',function($scope,$http){
    $http.get("api/getCat.php")
        .success(function(response) {
            $scope.category = response;
        })
        .error(function(response){
            console.log('error occured1');
        });
    
    $http.get("api/getBrand.php")
        .success(function(response) {
            $scope.brands = response;
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