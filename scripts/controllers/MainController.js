app.controller('MainController',function($scope,$http,$cookies,$window,proinfo){
	var self = this;
    $scope.home = false;
    if($window.location.pathname == "/index.html")
        $scope.home = true;
	$scope.date = new Date();
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
            $scope.brand = response;
			proinfo.storeBrands($scope.brand);
        })
        .error(function(response){
            console.log('error occured1');
        });
    
    $http.get("api/getProduct.php",{params:{loc:$cookies.get('Loc')}})
        .success(function(response) {
            $scope.products = response;
        })
        .error(function(response){
            console.log('error occured3');
        }); 
});