app.controller('loginCtrl',function($scope,$http){
	$scope.loginData = {};
	$scope.regData = {};
	$scope.processLogin = function(isValid) {
		if (isValid) {
			$http({
				method: 'POST',
				url: 'api/processLogin.php',
				data: $.param($scope.loginData),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
					console.log(data);
					if (!data.success) {
						$scope.message = data.message;
					} 
					else {
						$scope.message = data.message;
						console.log($scope.message);
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
					console.log(data);
					if (!data.success) {
						$scope.message = data.message;
					} 
					else {
						$scope.message = data.message;
						console.log($scope.message);
					}
				});	
		}
    };
});