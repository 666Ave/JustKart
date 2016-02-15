app.controller('locCtrl',function($scope,geolocation){
    $scope.coords = geolocation.getLocation().then(function(data){
		return {lat:data.coords.latitude, long:data.coords.longitude};
    });
	console.log($scope.coords);
});