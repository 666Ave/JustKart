app.controller('proCatCtrl',function($scope,$http,$location,$window){
	$scope.activey = 'true';
	if($location.search().catid)
		$http.get("api/getCatPro.php",{params:{catid:$location.search().catid}})
			.success(function(response) {
				$scope.product = response;
				$scope.cat=$location.search().catname;
			})
			.error(function(response){
				console.log('error occured3');
			});
	if($location.search().brandid)
		$http.get("api/getBrandPro.php",{params:{brandid:$location.search().brandid}})
			.success(function(response) {
				$scope.product = response;
				$scope.cat=$location.search().catname;
				$scope.brand=$location.search().brandname;
				$scope.activey = 'false';
			})
			.error(function(response){
				console.log('error occured3');
			});
	$scope.reload = function(){
		$window.location.reload();
	}
});