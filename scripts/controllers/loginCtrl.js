app.controller('loginCtrl',function($scope,$http,$window,authFact,$cookies){
	$scope.loginData = {};
	$scope.regData = {};
    $scope.userType = "What kind of user you want to be?";
	var userObj = authFact.getUserName();
	$scope.user = userObj;
	if($scope.user)
		$scope.Lstring = "Logout";
	else {
		$scope.Lstring = "Login";
		$scope.user = "Account";
	}
	$scope.processLogin = function(isValid) {
		if (isValid) {
			$http({
				method: 'POST',
				url: 'api/processLogin.php',
				data: $.param($scope.loginData),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
					if (!data.success) {
						$scope.message = data.message;
						$cookies.put('userObj',data.user);
						$window.alert($scope.message);
				        $window.location.reload();
					} 
					else {
						$scope.message = data.message;
						$cookies.put('userID',data.uid);
						$cookies.put('userObj',data.user);
						$window.alert($scope.message);
                        if($cookies.get('curr') && data.type == "normal"){
                            $scope.curr = $cookies.get('curr');
                            $cookies.remove('curr');
                            $window.location.href = $scope.curr;
                        }
                        else{
                            if(data.type == "normal")
                                $window.location.href = '/';
                            else if(data.type == "seller")
                                $window.location.href = '/seller.html';
                            else
                                $window.location.href = '/Admin_area/insert_product.html';
                        }   
					}
				});	
		}
    };
	$scope.processReg = function(isValid) {
		if (isValid) {
            if(!$scope.regData.type)
                $window.alert("Please select the user type");
            else
                $http({
                    method: 'POST',
                    url: 'api/processReg.php',
                    data: $.param($scope.regData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .success(function(data) {
                        if (!data.success) {
                            $scope.message = data.message;
                        } 
                        else {
                            $scope.message = data.message;
                            $window.alert($scope.message);
                            $window.location.reload();
                        }
                    });	
		}
    };
	$scope.Log = function(data){
		if(data == "Logout") {
			var cookies = $cookies.getAll();
			angular.forEach(cookies, function (v, k) {
				$cookies.remove(k);
			});
			alert("All cookies deleted");
			$window.location.href = 'login.html';
		}
		if(data == "Login") {
			$window.location.href = 'login.html';
		}
	};
    
    $scope.userSelect = function(data){
        if(data == "normal")
            $scope.userType = "Normal User";
        else
            $scope.userType = "Seller";
        $scope.regData.type = data;
        console.log($scope.regData);
    }
});