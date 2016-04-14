app.controller('proCatCtrl',function($scope,$http,$location,$window){
	$scope.activey = 'true';
	if($location.search().catid)
		$http.get("api/getCatPro.php",{params:{catid:$location.search().catid}})
			.success(function(response) {
				$scope.product = response;
				$scope.catLink=$location.search().catname;
                $scope.cat=$scope.catLink.split('_').join(' ');
			})
			.error(function(response){
				console.log('error occured3');
			});
	if($location.search().brandid)
		$http.get("api/getBrandPro.php",{params:{brandid:$location.search().brandid}})
			.success(function(response) {
				$scope.product = response;
				$scope.catLink=$location.search().catname;
				$scope.brandLink=$location.search().brandname;
                $scope.cat=$scope.catLink.split('_').join(' ');
                $scope.brand=$scope.brandLink.split('_').join(' ');
				$scope.activey = 'false';
			})
			.error(function(response){
				console.log('error occured3');
			});
	$scope.reload = function(){
        $window.location.href = "shop.html#/?catname="+$scope.catLink+"&catid="+$scope.product[0].product_cat
		$window.location.reload();
	}
});