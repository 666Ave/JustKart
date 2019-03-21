app.controller('recentLaunchCtrl',function($scope,$http){
    $http({
			method: 'GET',
			url: "api/getRecentLaunch.php"
		}).then(function(response) {
            $scope.recent = response;
        }, function(response){
            console.log('error occured3');
        });

});
