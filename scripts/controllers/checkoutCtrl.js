app.controller('checkoutCtrl',function($scope,$http,$cookies,$window){
    
    $scope.emiPeriod={};
    if($cookies.get('userID'))
		$scope.userID = $cookies.get('userID');
	else
		$scope.userID = 0;
    
    $http.get("api/user_info.php",{params:{uID:$scope.userID}})
        .success(function(response) {
            if(response.user) {
                $scope.UInfo = response;
                $scope.UInfo.Name = $scope.UInfo.fName+" "+$scope.UInfo.lName;
                $scope.url = "http://maps.googleapis.com/maps/api/geocode/json?address="+$cookies.get('chLoc')+"&sensor=false";
                $http.get($scope.url)
                    .success(function(response) {
                        if(response) {
                            $scope.UInfo.state = response['results'][0]['address_components'][2].long_name;
                        }
                    })
                    .error(function(response){
                        console.log('error occured');
                    })
            }
            else
                $window.alert("Not Registered. Please register");
                //$window.location.href ="/login.html";
        })
        .error(function(response){
            console.log("Error");
    });
    
    $scope.checkout = function(){
        $window.location.href="/orders.html#/?order=true";
    }
});