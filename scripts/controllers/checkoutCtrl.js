app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
enabled: true,
requireBase: false
});
		$locationProvider.hashPrefix('*');
    }])
.controller('checkoutCtrl',function($scope,$http,$cookies,$window){

    if(!$cookies.get('userID')){
        $window.alert("Please log in first");
        $window.location.href = 'login.html';
    }

    if($cookies.get('userType') == "seller"){
        $window.alert("You're here to sell not buy!");
        $window.location.href = 'seller.html';
    }

    if($cookies.get('userType') == "admin"){
        $window.alert("Please you're an admin ... behave yourself!");
        $window.location.href = 'Admin_area/admin.html'
    }

    $scope.emiPeriod={};

    if($cookies.get('userID')){
		    $scope.userID = $cookies.get('userID');
    }
  	else{
  		$scope.userID = 0;
    }

    $http({
			method: 'GET',
			url: "api/user_info.php",
			params: {uID:$scope.userID}
		}).then(function(response) {
            if(response.data.user) {
                $scope.UInfo = response.data;
                $scope.UInfo.Name = $scope.UInfo.fName+" "+$scope.UInfo.lName;
                $scope.url = "https://maps.googleapis.com/maps/api/geocode/json?address="+$cookies.get('chLoc')+"&sensor=false&key=AIzaSyAeogOgL1xxxJdmF6Js1p-7VQopeVzRD4k";
                $http({
            			method: 'GET',
            			url: $scope.url,
            			params: {uID:$scope.userID}
            		}).then(function(response) {
                        if(response.data) {
                            $scope.UInfo.state = response.data['results'][0]['address_components'][2].long_name;
                        }
                    }, function(response){
                        console.log('error occured');
                    });
            }
            else{
                $window.alert("Not Registered. Please register");
                //$window.location.href ="/login.html";
            }
        }, function(response){
            console.log("Error");
    });

    $scope.checkout = function(){
        $window.location.href="orders.html?order=true";
    }
});
