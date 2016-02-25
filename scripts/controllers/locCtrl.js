app.controller('locCtrl',function($scope,$http,$uibModal,$window,$cookies,$log,geolocation){
	if(!$cookies.get('chLoc')) {
		geolocation.getLocation().then(function(data){
			$scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};			
			$scope.url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.coords.lat+","+$scope.coords.long+"&sensor=false";
			$http.get($scope.url)
				.success(function(response) {
					if(response) {
						$scope.location = response['results'][3]['address_components'][1].long_name;
						console.log($scope.location);
					}
				})
				.error(function(response){
					console.log('error occured3');
				})
		});
	}
	else{
		$scope.url = "http://maps.googleapis.com/maps/api/geocode/json?address="+$cookies.get('chLoc')+"&sensor=false";
		$http.get($scope.url)
			.success(function(response) {
				if(response) {
					$scope.location = response['results'][0]['address_components'][0].long_name;
				}
			})
			.error(function(response){
				console.log('error occured3');
			})
	}

	$scope.$on('error', function(event, args) {
		$scope.error = args;
		$scope.open();
		console.log($scope.error);
	})

  $scope.open = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'location.html',
      controller: 'LocModalInstanceCtrl',
      resolve: {
        location: function () {
          return $scope.location;
        },
		error: function () {
          return $scope.error;
        }
      }
    });

    modalInstance.result.then(function (input) {		
		$scope.url = "http://maps.googleapis.com/maps/api/geocode/json?address="+input+"&sensor=false";
		$http.get($scope.url)
			.success(function(response) {
				if(response) {
					$cookies.put('chLoc',response['results'][0]['address_components'][0].long_name);
					$window.location.reload();
				}
			})
			.error(function(response){
				console.log('error occured3');
			})
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});