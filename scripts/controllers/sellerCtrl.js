app.controller('sellerCtrl',function($scope,$http,$cookies,$window,$filter){
    
    $scope.options = {
        maxDate: new Date(),
        showWeeks: true
    };
    $scope.noshop = false;
    $scope.areaTitle = "Area Name";
    $scope.area_names = ["Churchgate West", "Churchgate East", "Marine Lines West", "Marine Lines East", "Charni Road West", "Charni Road East", "Grant Road West", "Grant Road East", "Mumbai Central West", "Mumbai Central East", "Mahalaxmi West", "Mahalaxmi East", "Lower Parel West", "Lower Parel East", "Elphinstone Road West", "Elphinstone Road East", "Dadar West", "Dadar East", "Matunga Road West", "Matunga Road East", "Mahim West", "Mahim East", "Bandra West", "Bandra East", "Khar Road West", "Khar Road East", "Santacruz West", "Santacruz East", "Vile Parle West", "Vile Parle East", "Andheri West", "Andheri East", "Jogeshwari West", "Jogeshwari East", "Goregaon West", "Goregaon East", "Malad West", "Malad East", "Kandivali West", "Kandivali East", "Borivali West", "Borivali East", "Dahisar West", "Dahisar East", "Mira Road West", "Mira Road East", "Bhayandar West", "Bhayandar East", "Naigaon West", "Naigaon East", "Vasai West", "Vasai East", "NalaSopara West", "NalaSopara East", "Virar West", "Virar East"];
    $scope.shop = {};
    $scope.shop.user_id = $cookies.get('userID');
    $scope.Area = function(data) {
        $scope.areaTitle = data;
        $scope.shop.area_name = data;
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
    
    if($cookies.get('shopID') == null){
        $window.alert("You're not a seller ... please leave!");
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
    
    if($cookies.get('shopID') != 0){
        $http.get("/api/getShops.php",{params:{sid:$cookies.get('shopID')}})
            .success(function(response) {
                $scope.shop = response;
                $scope.shop[0].shop_id = $cookies.get('shopID');
                $scope.shopLink=$scope.shop[0].shop_name.split(' ').join('_');
            })
            .error(function(response){
                console.log('error occured2');
            });
    
        $http.get("/api/getShop.php",{params:{shopid:$cookies.get('shopID')}})
            .success(function(response) {
                $scope.products = response;
                delete $scope.products.area_name;
                delete $scope.products.owner_name;
                delete $scope.products.rating;
                delete $scope.products.reviews;
                delete $scope.products.shop_image;
            })
            .error(function(response){
                console.log('error occured2');
            });
    }
    else{
        $scope.noshop = true;
    }
    
    $scope.postShop = function(){
        if($cookies.get('userType') != "seller"){
            $window.alert("You're not a seller ... please leave!");
            $window.location.href = '/';
        }
        
        if($scope.shop.shop_image != null)
            $scope.shop.shop_image = $scope.shop.shop_image.name;
        else{
            $window.alert("Please upload the file again");
            return 0;
        }
            
        $http({
				method: 'POST',
				url: 'api/insert_shop.php',
				data: $.param($scope.shop),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
					if (!data.success) {
						$window.alert(data.message);
					} 
					else {
						$window.alert(data.message);
                        var cookies = $cookies.getAll();
                        angular.forEach(cookies, function (v, k) {
                            $cookies.remove(k);
                        });
                        $window.location.href = 'login.html';
					}
				});
    };
    
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
    
    $scope.removePro = function(data){
        $http.get("/api/removeProduct.php",{params:{proid:data}})
            .success(function(response) {
                $window.alert(response);
                $window.location.reload();
            })
            .error(function(response){
                console.log('error occured2');
            })
        ;   
    };
    
});