app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
enabled: true,
requireBase: false
});
		$locationProvider.hashPrefix('*');
    }])
.controller('cartCtrl',function($scope,$http,$window,$cookies,$location,$filter,authFact){
	$scope.pQty=1;
	$scope.total = [];
	$scope.cart_length=0;
	$scope.proID = 0;
	$scope.noitems = false;

	if($cookies.get('userID'))
		$scope.userID = $cookies.get('userID');
    else
        $scope.userID = 0;

    if($window.location.pathname == "/JustKart/cart.html" && !$cookies.get('userID')){
        $window.alert("Please log in first");
        $window.location.href = '/JustKart/login.html';
    }

    if($window.location.pathname == "/JustKart/cart.html" && $cookies.get('userType') == "seller"){
        $window.alert("You're here to sell not buy!");
        $window.location.href = '/JustKart/seller.html';
    }

    if($window.location.pathname == "/JustKart/cart.html" && $cookies.get('userType') == "admin"){
        $window.alert("Please you're an admin ... behave yourself!");
        $window.location.href = '/JustKart/Admin_area/admin.html'
    }

	$scope.cartAdd = function (proid) {
		$scope.proID = proid;
		if(!$cookies.get('userID')){
			$window.alert("Please log in first");
            $cookies.put('curr',$window.location.pathname+$window.location.hash);
			$window.location.href = '/JustKart/login.html';
		}
        else if($cookies.get('userType') == "seller"){
            $window.alert("You're here to sell not buy!");
            return 0;
        }
        else if($cookies.get('userType') == "admin"){
            $window.alert("Please you're an admin ... behave yourself!");
            return 0;
        }
        else{
            $http({
							method: 'GET',
							url: "api/cart_add.php",
							params: {add_cart:$scope.proID,qty:$scope.pQty,uID:$scope.userID}
						}).then(function(response) {
                    if(!response.data.success) {
											if($window.confirm("Product successfully added to cart. Do you want to go to your cart?")) {
													$window.location.href = '/JustKart/cart.html';
												}
                      else{
													$window.location.reload();
											}
                    }
                    else
                        $window.alert("Product already present in cart");
                }, function(response){
                    console.log("error");
                });
        }
	};

	$scope.PageLoad = function () {
		$http({
			method: 'GET',
			url: "api/total_cart_items.php",
			params: {uID:$scope.userID}
		}).then(function(response) {
				if(response.data){
					$scope.Cart_total = response.data;
				}
				else{
					$scope.Cart_total = 0;
				}
			}, function(response){
				console.log('error occured3');
			});
	};

    $http({
			method: 'GET',
			url: "api/cart_disp.php",
			params: {uID:$scope.userID}
		}).then(function(response) {
			if(response.data) {
				$scope.cart_items = response.data;
				$scope.cart_length = Object.keys($scope.cart_items).length;
			for(var i=0; i<$scope.cart_length; i++)
					$scope.total[i] = $scope.cart_items[i].product_price;
			}
			else{
					$scope.noitems = true;
					if($location.url() == "/JustKart/checkout.html"){
						$window.alert("Please buy something first!!");
						$window.location.href = '/JustKart/';
						}
			}
		}, function(response){
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
			$http({
				method: 'GET',
				url: "api/cart_delete.php",
				params: {delete_cart:proID,uID:$scope.userID}
			}).then(function(response) {
					$scope.Cart_delete = response.data;
					$window.alert("Product successfully deleted to cart");
					$window.location.reload();
				}, function(response){
					console.log('error occured3');
				});
		};

    $scope.checkOut= function () {
		if($scope.noitems == false){
			$window.location.href = '/JustKart/checkout.html';
		}
		else{
			if($window.confirm("Please buy something first!!")) {
					$window.location.href = '/JustKart/';
	      }
		}
	};
});
