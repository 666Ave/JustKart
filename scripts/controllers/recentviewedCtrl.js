app.controller('recentviewedCtrl',function($scope,$http){ 
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.active = 0;

    $http.get("api/getRecentViewed.php")
        .success(function(response) {
            $scope.slides = response;
        })
        .error(function(response){
            console.log('error occured3');
        });

});