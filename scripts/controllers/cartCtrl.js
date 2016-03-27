app.controller('cartCtrl',function($scope,$http,$window,$cookies,$filter,authFact){
	$scope.pQty=1;
	$scope.total = [];
	$scope.cart_length=0;
	
	if($cookies.get('userID'))
		$scope.userID = $cookies.get('userID');
	else
		$scope.userID = 0;
	
	$scope.cartAdd = function (proID,Pqty) {
		if(!$cookies.get('userID')){
			$window.alert("Please log in first");
			$window.location.href = '/login.html';
		}
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
				$scope.cart_length = Object.keys($scope.cart_items).length;
				for(var i=0; i<$scope.cart_length; i++)
					$scope.total[i] = $scope.cart_items[i].product_price;
			}
        })
        .error(function(response){
            console.log('error occured3');
        });
	
	$scope.total_s = function(){
		$scope.t=0;
		for(var i=0; i<$scope.cart_length; i++)
			$scope.t += $filter('num')($scope.total[i]);
		return $scope.t;
	};
	
	$scope.total_p = function(){
		$scope.t = $scope.total_s();
		$scope.t += 500;
		return $scope.t;
	};

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
    
    $scope.checkOut= function () {
		$window.location.href = '/checkout.html';
	};
});