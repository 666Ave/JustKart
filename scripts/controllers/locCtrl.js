app.controller('locCtrl',function($scope,$http,$uibModal,$window,$cookies,$log,geolocation,proinfo){
 
	if(!$cookies.get('chLoc')) {
		geolocation.getLocation().then(function(data){
			$scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};			
			$scope.url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.coords.lat+","+$scope.coords.long+"&sensor=false";
			$http.get($scope.url)
				.success(function(response) {
					if(response) {
						$scope.location = response['results'][3]['address_components'][1].long_name;
                        $cookies.put('Loc',$scope.location);
					}
				})
				.error(function(response){
					console.log('error occured3');
				})
		});
	}
    else
        $scope.location = $cookies.get('Loc');

	$scope.$on('error', function(event, args) {
		$scope.error = args;
		$scope.open();
		console.log($scope.error);
	});

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
					$cookies.put('Loc',response['results'][0]['address_components'][0].long_name);
                    $cookies.put('chLoc',1);
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