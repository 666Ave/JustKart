app.controller('locCtrl',function($scope,$http,$uibModal,$window,$cookies,$log,geolocation,proinfo){
    var j = 0;
    var $ctrl = this;

  if(!$cookies.get('Loc')){
    $cookies.remove('chLoc');
  }

	if(!$cookies.get('chLoc')) {
		geolocation.getLocation().then(function(data){
			$scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
			$scope.url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.coords.lat+","+$scope.coords.long+"&sensor=false&key=AIzaSyAeogOgL1xxxJdmF6Js1p-7VQopeVzRD4k";
			$http({
  			method: 'GET',
  			url: $scope.url
  		}).then(function(response) {
					if(response) {
						$scope.location = response['results'][0]['address_components'];
                        for(var i=0; i<$scope.location.length; i++)
                            if($scope.location[i].types[0] == "sublocality_level_1")
                                j =i;
                        $scope.location = $scope.location[j].long_name;
                        $cookies.put('Loc',$scope.location);
					}
				}, function(response){
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
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
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
		$scope.url = "https://maps.googleapis.com/maps/api/geocode/json?address="+input+"&sensor=false&key=AIzaSyAeogOgL1xxxJdmF6Js1p-7VQopeVzRD4k";
		$http({
      method: 'GET',
      url: $scope.url
    }).then(function(response) {
				if(response) {
          console.log(response);
					$cookies.put('Loc',response.data['results'][0]['address_components'][0].long_name);
          $cookies.put('chLoc',1);
					$window.location.reload();
				}
			}, function(response){

				console.log('error occured3');
			})
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
