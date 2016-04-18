app.controller('adminCtrl',function($scope,$http,$window){
    $http.get("api/getAllUsers.php")
        .success(function(response) {
            $scope.users = response;
        })
        .error(function(response){
            console.log('error occured1');
        });
    
    $http.get("api/getAllProducts.php")
        .success(function(response) {
            $scope.products = response;
        })
        .error(function(response){
            console.log('error occured1');
        });
    
    $http.get("api/getAllShops.php")
        .success(function(response) {
            $scope.shops = response;
            for(var i=0; i<$scope.shops.length; i++){
                $scope.shops[i].shopLink = $scope.shops[i].shop_name.split(' ').join('_');
            }
        })
        .error(function(response){
            console.log('error occured1');
        });
    
    $scope.removePro = function(data){
        $http.get("/api/removeProduct.php",{params:{proid:data}})
            .success(function(response) {
                $window.alert(response);
                $window.location.reload();
            })
            .error(function(response){
                console.log('error occured2');
            });   
    };
    
    $scope.removeShop = function(data){
        $http.get("/api/removeShop.php",{params:{shopid:data}})
            .success(function(response) {
                $window.alert(response);
                $window.location.reload();
            })
            .error(function(response){
                console.log('error occured2');
            });   
    };
    
    $scope.removeUser = function(data){
        $http.get("/api/removeUser.php",{params:{userid:data}})
            .success(function(response) {
                $window.alert(response);
                $window.location.reload();
            })
            .error(function(response){
                console.log('error occured2');
            });   
    };
});