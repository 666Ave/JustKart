app.controller('recentviewedCtrl',function($scope,$http){
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.active = 0;

    $http({
			method: 'GET',
			url: "api/getRecentViewed.php"
		}).then(function(response) {
            $scope.slides = response;
        }, function(response){
            console.log('error occured3');
        });

});
