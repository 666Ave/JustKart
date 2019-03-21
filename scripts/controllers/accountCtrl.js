app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
enabled: true,
requireBase: false
});
		$locationProvider.hashPrefix('*');
    }])
.controller('accountCtrl',function($scope,$http,$window,$cookies){

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
    $scope.noreviews = false;

    if(!$cookies.get('userID')){
        $window.alert("Please log in first");
        $window.location.href="login.html";
    }

	$scope.processProfile = function(isValid) {
		if (isValid) {
			$http({
				method: 'POST',
				url: 'api/processProfile.php',
				data: $scope.updateProfile
			})
				.then(function(data) {
					if (!data.data.success) {
						$window.alert(data.data.message);
						$window.location.reload();
					}
					else {
						$window.alert(data.data.message);
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
                    data: $scope.updatePassword
                })
                    .then(function(data) {
                        $window.alert(data.data.message);
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
                data: $scope.updateAddress
            })
                .then(function(data) {
                    $window.alert(data.data.message);
                    $window.location.reload();
                });
		}
    };

    $scope.processMob = function(isValid) {
		if(isValid) {
            $http({
                method: 'POST',
                url: 'api/processMobEmail.php',
                data: $scope.updateMobile
            })
                .then(function(data) {
                    $window.alert(data.data.message);
                    $window.location.reload();
                });
		}
    };

    $scope.processDeact = function(isValid) {
		if(isValid) {
            $http({
                method: 'POST',
                url: 'api/processDeact.php',
                data: $scope.deactivate
            })
                .then(function(data) {
                    $window.alert(data.data.message);
                    var cookies = $cookies.getAll();
                    angular.forEach(cookies, function (v, k) {
                        $cookies.remove(k);
                    });
                    $window.href = "/JustKart/";
                });
		}
    };

    $http({
			method: 'GET',
			url: "api/user_info.php",
			params: {uID:$scope.updateProfile.userID}
		}).then(function(response) {
            if(response.data.user) {
                $scope.updateProfile.fName = response.data.fName;
                $scope.updateProfile.lName = response.data.lName;
                $scope.updateProfile.gender = response.data.gender;
                $scope.updateAddress.address = response.data.Address;
                $scope.updateAddress.pin = response.data.Pin_code;
                $scope.updateMobile.mobile = response.data.Mobile_no;
                $scope.updateMobile.email = response.data.email;
                $scope.deactivate.uname = response.data.uname;
            }
        }, function(response){
            console.log("Error");
    });

    $http({
			method: 'GET',
			url: "api/getReviewsRating.php",
			params: {uID:$scope.updateProfile.userID}
		}).then(function(response) {
      if(response.data.length == 0){
        $scope.noreviews = true;
      }
			$scope.reviews = response.data;
		}, function(response){
			console.log('error occured ');
		});

});
