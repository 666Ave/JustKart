app.controller('adminCtrl',function($scope,$http,$window){

    $http({
			method: 'GET',
			url: "api/getAllUsers.php"
		}).then(function(response) {
            $scope.users = response.data;
        }, function(response){
            console.log('error occured1');
        });

    $http({
			method: 'GET',
			url: "api/getAllProducts.php"
		}).then(function(response) {
            $scope.products = response.data;
        }, function(response){
            console.log('error occured1');
        });

    $http({
			method: 'GET',
			url: "api/getAllShops.php"
		}).then(function(response) {
            $scope.shops = response.data;
            for(var i=0; i<$scope.shops.length; i++){
                $scope.shops[i].shopLink = $scope.shops[i].shop_name.split(' ').join('_');
            }
        }, function(response){
            console.log('error occured1');
        });

    $scope.removePro = function(data) {
        $http({
    			method: 'GET',
    			url: "api/removeProduct.php",
    			params: {proid:data}
    		}).then(function(response) {
                $window.alert(response.data);
                $window.location.reload();
            }, function(response){
                console.log('error occured2');
            });
    };

    $scope.removeShop = function(data) {
        $http({
    			method: 'GET',
    			url: "api/removeShop.php",
    			params: {shopid:data}
    		}).then(function(response) {
                $window.alert(response.data);
                $window.location.reload();
            }, function(response){
                console.log('error occured2');
            });
    };

    $scope.removeUser = function(data) {
        $http({
    			method: 'GET',
    			url: "api/removeUser.php",
    			params: {userid:data}
    		}).then(function(response) {
                $window.alert(response.data);
                $window.location.reload();
            }, function(response){
                console.log('error occured2');
            });
    };
});
