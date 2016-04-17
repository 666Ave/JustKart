app.controller('shopCtrl',function($scope,$http,$location,$window){
	$scope.activey = 'true';
    $scope.shop = 0;
    $scope.title = "Products | JustKart";
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
    
    if($location.search().shopid){
        $scope.shop = 1;
        $scope.title = "Shop | JustKart";
		$http.get("api/getShop.php",{params:{shopid:$location.search().shopid}})
			.success(function(response) {
				$scope.shops = response;
                $scope.area_name = $scope.shops.area_name;
                $scope.owner_name = $scope.shops.owner_name;
                $scope.shop_image = $scope.shops.shop_image;
                $scope.rating = $scope.shops.rating;
                $scope.reviews = $scope.shops.reviews;
                delete $scope.shops.shop_image;
				delete $scope.shops.area_name;
                delete $scope.shops.owner_name;
                delete $scope.shops.reviews;
                delete $scope.shops.rating;
				$scope.shopLink=$location.search().shopname;
                $scope.shopname=$scope.shopLink.split('_').join(' ');
			})
			.error(function(response){
				console.log('error occured3');
			});
    }
});