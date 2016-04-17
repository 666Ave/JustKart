app.controller('sellerCtrl',function($scope,$http,$cookies,$window,$filter){
    
    $scope.options = {
        maxDate: new Date(),
        showWeeks: true
    };
    $scope.product = {};
    $scope.brand = {};
    $scope.product.dt = new Date();
    $scope.product.shop_id = $cookies.get('shopID');
    $scope.product.product_image = null;
    $scope.launch = true;
    $scope.title = "Dont want to add";
    
    $scope.toggleLaunch = function(){
        $scope.launch = !$scope.launch
        if($scope.launch == true)
            $scope.title = "Dont want to add";
        else
            $scope.title = "Want to add";
    };
    
    if($window.location.pathname == "/seller.html" && !$cookies.get('userID')){
        $window.alert("Please log in first");
        $window.location.href = '/login.html';
    }
    
    if($cookies.get('userType') != "seller"){
        $window.alert("You're not a seller ... please leave!");
        $window.location.href = '/';
    }
    
    $http.get("/api/getCat.php")
        .success(function(response) {
            $scope.category = response;
        })
        .error(function(response){
            console.log('error occured1');
        });
    
    $http.get("/api/getBrand.php")
        .success(function(response) {
            $scope.brands = response;
        })
        .error(function(response){
            console.log('error occured2');
        });
    
    $http.get("/api/getShops.php",{params:{sid:$cookies.get('shopID')}})
        .success(function(response) {
            $scope.shop = response;
            $scope.shop[0].shop_id = $cookies.get('shopID');
            $scope.shopLink=$scope.shop[0].shop_name.split(' ').join('_');
        })
        .error(function(response){
            console.log('error occured2');
        });
    
    $scope.postPro = function(){
        if($cookies.get('userType') != "seller"){
            $window.alert("You're not a seller ... please leave!");
            $window.location.href = '/';
        }
        if($scope.launch == false)
            delete $scope.product.dt;
        else
            $scope.product.dt = $filter('date')($scope.product.dt,"yyyy-MM-dd");
        
        if($scope.product.product_image != null)
            $scope.product.product_image = $scope.product.product_image.name;
        else{
            $window.alert("Please upload the file again");
            return 0;
        }
            
        $http({
				method: 'POST',
				url: 'api/insert_products.php',
				data: $.param($scope.product),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
					if (!data.success) {
						$window.alert(data.message);
					} 
					else {
						$window.alert(data.message);
                        $window.location.reload();
					}
				});
    };
    
    $scope.postBrand = function(){
        if($cookies.get('userType') != "seller"){
            $window.alert("You're not a seller ... please leave!");
            $window.location.href = '/';
        }
        
        for(var i=0; i<$scope.brands.length; i++){
            if($scope.brands[i].brand_title == $scope.brand.brand_title){
                $window.alert("This brand already exists");
                return 0;
            }
        }
            
        $http({
				method: 'POST',
				url: 'api/insert_brand.php',
				data: $.param($scope.brand),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
					if (!data.success) {
						$window.alert(data.message);
					} 
					else {
						$window.alert(data.message);
                        $window.location.reload();
					}
				});
    };
    
});