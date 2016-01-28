app.controller('searchCtrl',function($scope,$http,$location,$window){
    $http.get("api/search_results.php",{params:{user_query:$location.search().user_query}})
        .success(function(response) {
            $scope.searchProd = response;
			$scope.user_query = $location.search().user_query;
			$scope.reloadPage = function() {
				$window.location.reload();	
			}
			$scope.total =0;
			$scope.index =function()
			{
    			$scope.total ++;
			}
			console.log($scope.total);
        })
        .error(function(response){
            console.log('error occured');
        });

});