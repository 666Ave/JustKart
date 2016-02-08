app.controller('proCatCtrl',function($scope,$http,$location){
    $http.get("api/getCatPro.php",{params:{catid:$location.search().catid}})
        .success(function(response) {
            $scope.proCats = response;
			$scope.cat=$location.search().catname;
        })
        .error(function(response){
            console.log('error occured3');
        });

});