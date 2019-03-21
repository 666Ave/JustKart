app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
enabled: true,
requireBase: false
});
		$locationProvider.hashPrefix('*');
    }])
.controller('searchCtrl',function($scope,$http,$location,$window){

    $scope.noPro = false;
    $http({
			method: 'GET',
			url: "api/search_results.php",
			params: {user_query:$location.search().user_query}
		}).then(function(response) {
      $scope.searchProd = response.data;
			$scope.user_query = $location.search().user_query;
			$scope.total =0;
			$scope.index =function()
			{
    			$scope.total ++;
			}
			if(response.data == "")
                $scope.noPro = true;
        }, function(response){
            console.log('error occured');
        });
        $scope.reloadPage = function() {
        $window.location.reload();
    }
});
