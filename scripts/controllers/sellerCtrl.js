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
        $scope.launch = !$scope.launch;
        if($scope.launch == true)
            $scope.title = "Dont want to add";
        else
            $scope.title = "Want to add";
    };

    if($window.location.pathname == "/seller.html" && !$cookies.get('userID')){
        $window.alert("Please log in first");
        $window.location.href = '/JustKart/login.html';
    }

    if($cookies.get('userType') != "seller"){
        $window.alert("You're not a seller ... please leave!");
        $window.location.href = '/JustKart/';
    }

    if($cookies.get('shopID') == null){
        $window.alert("You're not a seller ... please leave!");
    }

    $http({
			method: 'GET',
			url: "api/getCat.php"
		}).then(function(response) {
            $scope.category = response.data;
        }, function(response){
            console.log('error occured1');
        });

    $http({
			method: 'GET',
			url: "api/getBrand.php"
		}).then(function(response) {
            $scope.brands = response.data;
        }, function(response){
            console.log('error occured2');
        });

    if($cookies.get('shopID') != 0){
        $http({
    			method: 'GET',
    			url: "api/getShops.php",
    			params: {sid:$cookies.get('shopID')}
    		}).then(function(response) {
                $scope.shop = response.data;
                $scope.shop[0].shop_id = $cookies.get('shopID');
                $scope.shopLink=$scope.shop[0].shop_name.split(' ').join('_');
            }, function(response){
                console.log('error occured2');
            });

        $http({
    			method: 'GET',
    			url: "api/getShop.php",
    			params: {shopid:$cookies.get('shopID')}
    		}).then(function(response) {
                $scope.products = response.data;
                delete $scope.products.area_name;
                delete $scope.products.owner_name;
                delete $scope.products.rating;
                delete $scope.products.reviews;
                delete $scope.products.shop_image;
            }, function(response){
                console.log('error occured2');
            });
    }
    else{
        $scope.noshop = true;
    }

    $scope.postShop = function(){
        if($cookies.get('userType') != "seller"){
            $window.alert("You're not a seller ... please leave!");
            $window.location.href = '/JustKart/';
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
				data: $scope.shop
			})
				.then(function(data) {
					if (!data.data.success) {
						$window.alert(data.data.message);
					}
					else {
						$window.alert(data.data.message);
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
            $window.location.href = '/JustKart/';
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
				data: $scope.product
			})
				.then(function(data) {
					if (!data.data.success) {
						$window.alert(data.data.message);
					}
					else {
						$window.alert(data.data.message);
            $window.location.reload();
					}
				});
    };

    $scope.postBrand = function(){
        if($cookies.get('userType') != "seller"){
            $window.alert("You're not a seller ... please leave!");
            $window.location.href = '/JustKart/';
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
				data: $scope.brand
			})
				.then(function(data) {
					if (!data.data.success) {
						$window.alert(data.data.message);
					}
					else {
						$window.alert(data.data.message);
            $window.location.reload();
					}
				});
    };

    $scope.removePro = function(data){
        $http({
    			method: 'GET',
    			url: "api/removeProduct.php",
    			params: {proid:data}
    		}).then(function(response) {
                $window.alert(response.data);
                $window.location.reload();
            }, function(response){
                console.log('error occured2');
            })
        ;
    };

});
