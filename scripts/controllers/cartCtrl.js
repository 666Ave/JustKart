app.controller('cartCtrl',function($scope,$http,$window,$cookies,authFact){
	$scope.pQty=1;
	if($cookies.get('userID'))
		$scope.userID = $cookies.get('userID');
	else
		$scope.userID = 0;
	$scope.cartAdd = function (proID,Pqty) {
		$http.get("api/cart_add.php",{params:{add_cart:proID,qty:$scope.pQty,uID:$scope.userID}})
			.success(function(response) {
				if(!response.success) {
					$window.alert("Product successfully added to cart");
					$window.location.reload();
				}
				else
					$window.alert("Product already present in cart");
			})
			.error(function(response){
				console.log("Error");
			});
	};
	
	$scope.PageLoad = function () {
		$http.get("api/total_cart_items.php",{params:{uID:$scope.userID}})
			.success(function(response) {
				if(response)
					$scope.Cart_total = response;
				else
					$scope.Cart_total = 0;
			})
			.error(function(response){
				console.log('error occured3');
			});
	};
	
    $http.get("api/cart_disp.php",{params:{uID:$scope.userID}})
        .success(function(response) {
			if(response) {
				$scope.cart_items = response;
				$scope.cart_total = $scope.cart_items.total_price;
				delete $scope.cart_items['total_price'];
			}
        })
        .error(function(response){
            console.log('error occured3');
        });
	
	$scope.cartDelete= function (proID) {
		$http.get("api/cart_delete.php",{params:{delete_cart:proID,uID:$scope.userID}})
			.success(function(response) {
				$scope.Cart_delete = response;
				console.log($scope.Cart_delete);
				$window.alert("Product successfully deleted to cart");
				$window.location.reload();
			})
			.error(function(response){
				console.log('error occured3');
			});
	};
});