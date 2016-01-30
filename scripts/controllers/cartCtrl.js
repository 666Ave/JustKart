app.controller('cartCtrl',function($scope,$http){
	$scope.Cart_add ="";
	$scope.Cart_total ="";
	$scope.loadData = function (proID) {
		$http.get("api/cart_add.php",{params:{add_cart:proID}})
			.success(function(response) {
				$scope.Cart_add = response;
				console.log($scope.Cart_add);
				console.log(proID);
			})
			.error(function(response){
				console.log('error occured3');
			});

	};
	
	$scope.PageLoad = function () {
		$http.get("api/total_cart_items.php")
			.success(function(response) {
				$scope.Cart_total = response;
				console.log($scope.Cart_total);
			})
			.error(function(response){
				console.log('error occured3');
			});
	}
});