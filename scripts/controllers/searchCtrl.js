app.controller('searchCtrl',function($scope,$http,$location,$window){
    $scope.noPro = false;
    $http.get("api/search_results.php",{params:{user_query:$location.search().user_query}})
        .success(function(response) {
            $scope.searchProd = response;
			$scope.user_query = $location.search().user_query;
			$scope.total =0;
			$scope.index =function()
			{
    			$scope.total ++;
			}
			if(response == "")
                $scope.noPro = true;
            console.log(response);
        })
        .error(function(response){
            console.log('error occured');
        });
        $scope.reloadPage = function() {
        $window.location.reload();	
    }
});