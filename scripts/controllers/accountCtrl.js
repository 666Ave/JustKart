app.controller('accountCtrl',function($scope,$http,$window,$cookies){
    $scope.updateProfile = {};
    $scope.updateProfile.userID = $cookies.get('userID');
    $scope.updatePassword = {};
    $scope.updatePassword.userID = $scope.updateProfile.userID;
    $scope.updateAddress = {};
    $scope.updateAddress.userID = $scope.updateProfile.userID;
    $scope.updateMobile = {};
    $scope.updateMobile.userID = $scope.updateProfile.userID;
    $scope.deactivate = {};
    $scope.deactivate.userID = $scope.updateProfile.userID
    
    if(!$cookies.get('userID')){
        $window.alert("Please log in first");
        $window.location.href="login.html";
    }
    
	$scope.processProfile = function(isValid) {
		if (isValid) {
			$http({
				method: 'POST',
				url: 'api/processProfile.php',
				data: $.param($scope.updateProfile),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
					if (!data.success) {
						$window.alert(data.message);
						$window.location.reload();
					} 
					else {
						$window.alert(data.message);
						$window.location.reload();
					}
				});	
		}
    };
    
    $scope.processPassword = function(isValid) {
		if(isValid) {
            if($scope.updatePassword.oldpassword === $scope.updatePassword.password){
                $window.alert("Password should be different than the last password!");
            }
            else{
                $http({
                    method: 'POST',
                    url: 'api/processPassword.php',
                    data: $.param($scope.updatePassword),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .success(function(data) {
                        $window.alert(data.message);
                        $window.location.reload();
                    });	
            }
		}
    };
    
    $scope.processAddress = function(isValid) {
		if(isValid) {
            $http({
                method: 'POST',
                url: 'api/processAddress.php',
                data: $.param($scope.updateAddress),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function(data) {
                    $window.alert(data.message);
                    $window.location.reload();
                });	
		}
    };
    
    $scope.processAddress = function(isValid) {
		if(isValid) {
            $http({
                method: 'POST',
                url: 'api/processAddress.php',
                data: $.param($scope.updateAddress),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function(data) {
                    $window.alert(data.message);
                    $window.location.reload();
                });	
		}
    };
    
    $scope.processMob = function(isValid) {
		if(isValid) {
            $http({
                method: 'POST',
                url: 'api/processMobEmail.php',
                data: $.param($scope.updateMobile),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function(data) {
                    $window.alert(data.message);
                    $window.location.reload();
                });	
		}
    };
    
    $scope.processDeact = function(isValid) {
		if(isValid) {
            $http({
                method: 'POST',
                url: 'api/processDeact.php',
                data: $.param($scope.deactivate),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function(data) {
                    $window.alert(data.message);
                    var cookies = $cookies.getAll();
                    angular.forEach(cookies, function (v, k) {
                        $cookies.remove(k);
                    });
                    $window.href = "/";
                });	
		}
    };
    
    $http.get("api/user_info.php",{params:{uID:$scope.updateProfile.userID}})
        .success(function(response) {
            if(response.user) {
                $scope.updateProfile.fName = response.fName;
                $scope.updateProfile.lName = response.lName;
                $scope.updateProfile.gender = response.gender;
                $scope.updateAddress.address = response.Address;
                $scope.updateAddress.pin = response.Pin_code;
                $scope.updateMobile.mobile = response.Mobile_no;
                $scope.updateMobile.email = response.email;
                $scope.deactivate.uname = response.uname;
            }
        })
        .error(function(response){
            console.log("Error");
    });
    
    $http.get("api/getReviewsRating.php",{params:{uid:$scope.updateProfile.userID}})
		.success(function(response) {
			$scope.reviews = response;
		})
		.error(function(response){
			console.log('error occured ');
		});
    
});