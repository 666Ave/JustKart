app.controller('cartCtrl',function($scope,$http,$window){
	$scope.pQty=1;
	$scope.cartAdd = function (proID) {
		$http.get("api/cart_add.php",{params:{add_cart:proID,qty:$scope.pQty}})
			.success(function(response) {
				$scope.Cart_add = response;
				$window.location.reload();
				console.log($scope.Cart_add);
			})
			.error(function(response){
				console.log('error occured3');
			});
	};
	
	$scope.PageLoad = function () {
		$http.get("api/total_cart_items.php")
			.success(function(response) {
				$scope.Cart_total = response;
			})
			.error(function(response){
				console.log('error occured3');
			});
	};
	
    $http.get("api/cart_disp.php")
        .success(function(response) {
            $scope.cart_items = response;
			$scope.cart_total = $scope.cart_items.total_price;
			delete $scope.cart_items['total_price'];
        })
        .error(function(response){
            console.log('error occured3');
        });
	
	$scope.cartDelete= function (proID) {
		$http.get("api/cart_delete.php",{params:{delete_cart:proID}})
			.success(function(response) {
				$scope.Cart_delete = response;
				console.log($scope.Cart_delete);
				$window.location.reload();
			})
			.error(function(response){
				console.log('error occured3');
			});
	};
});