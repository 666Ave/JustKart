app.controller('loginCtrl',function($scope,$http,$window,authFact,$cookies){
	$scope.loginData = {};
	$scope.regData = {};
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
						$window.location.href = '/';
					}
				});	
		}
    };
	$scope.processReg = function(isValid) {
		if (isValid) {
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
});