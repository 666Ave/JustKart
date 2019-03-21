app.controller('MainController',function($scope,$http,$cookies,$window,proinfo){
	var self = this;
    $scope.home = false;
    if($window.location.pathname == "/JustKart/index.html"){
        $scope.home = true;
		}
	$scope.date = new Date();

    $http({
			method: 'GET',
			url: "api/getCat.php"
		}).then(function(response) {
            $scope.category = response.data;
			proinfo.storeCats($scope.category);
		}, function(response){
            console.log(response);
        });

    $http({
			method: 'GET',
			url: "api/getBrand.php"
		}).then(function(response) {
            $scope.brand = response.data;
			proinfo.storeBrands($scope.brand);
		}, function(response){
            console.log('error occured2');
        });

    $http({
			method: 'GET',
			url: "api/getProduct.php",
			params: {loc:$cookies.get('Loc')}
		}).then(function(response) {
            $scope.products = response.data;
        }, function(response){
            console.log('error occured3');
        });
});
