app.controller('recentLaunchCtrl',function($scope,$http){  
    $http.get("api/getRecentLaunch.php")
        .success(function(response) {
            $scope.recent = response;
        })
        .error(function(response){
            console.log('error occured3');
        });

});