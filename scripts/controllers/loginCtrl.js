app.controller('loginCtrl',function($scope,$http,$window,authFact,$cookies){
	$scope.loginData = {};
	$scope.regData = {};
  $scope.Admin = false;
  $scope.Seller = false;
  $scope.User = false;
	var userObj = authFact.getUserName();
	$scope.user = userObj;

    if($scope.user)
		$scope.Lstring = "Logout";
	else {
		$scope.Lstring = "Login";
		$scope.user = "Account";
	}

    if($cookies.get('userType') == "admin")
        $scope.Admin = true;
    else if($cookies.get('userType') == "seller")
        $scope.Seller = true;
    else
        $scope.User = true;

	$scope.processLogin = function(isValid) {
		if (isValid) {
			$http({
				method: 'POST',
				url: 'api/processLogin.php',
				data: $scope.loginData
			})
				.then(function(data) {
					if (!data.data.success) {
						$scope.message = data.data.message;
						$cookies.put('userObj',data.data.user);
						$window.alert($scope.message);
				        $window.location.reload();
					}
					else {
						$scope.message = data.data.message;
						$cookies.put('userID',data.data.uid);
						$cookies.put('userObj',data.data.user);
            $cookies.put('userType',data.data.type);
						$window.alert($scope.message);
            if($cookies.get('curr') && data.data.type == "normal"){
                $scope.curr = $cookies.get('curr');
                $cookies.remove('curr');
                $window.location.href = $scope.curr;
            }
            else{
                if(data.data.type == "normal")
                    $window.location.href = '/JustKart/';
                else if(data.data.type == "seller"){
                    $cookies.put('shopID',data.data.shop_id);
                    $window.location.href = '/JustKart/seller.html';
                }
                else
                    $window.location.href = '/JustKart/admin.html';
            }
					}
				});
		}
    };

	$scope.processReg = function(isValid) {
		console.log($scope.regData.type);
		if (isValid) {
			if(!$scope.regData.type)
			    $window.alert("Please select the user type");
			else
			    $http({
			        method: 'POST',
			        url: 'api/processReg.php',
			        data: $scope.regData
			    }).then(function(data) {
	            if (!data.data.success) {
									$cookies.remove('userID');
									$cookies.remove('userObj');
									$cookies.remove('userType');
	                $scope.message = data.data.message;
	                $window.alert($scope.message);
	            }
	            else {
									$cookies.remove('userID');
									$cookies.remove('userObj');
									$cookies.remove('userType');
	                $scope.message = data.data.message;
	                $window.alert($scope.message);
	                $window.location.reload();
	            }
						}, function(response){
			            console.log(response);
	        });
			}
    };
	$scope.Log = function(data){
		if(data == "Logout") {
			$cookies.remove('userID');
			$cookies.remove('userObj');
			$cookies.remove('userType');
			}
			alert("Logging out!!");
			$window.location.href = '/JustKart/login.html';

		if(data == "Login") {
			$window.location.href = '/JustKart/login.html';
		}
	};

	$scope.genderSelect = function(){
		$scope.regData.gender = $scope.gender;
	};

    $scope.userSelect = function(){
        $scope.regData.type = $scope.userType;
    };
});
