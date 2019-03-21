app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
enabled: true,
requireBase: false
});
		$locationProvider.hashPrefix('*');
    }])
.controller('orderCtrl',function($scope,$http,$cookies,$window,$location){

    $scope.oconfirm = $location.search().order;
    $scope.noorders = false;
    if($cookies.get('userID'))
        $scope.userID = $cookies.get('userID');
    else
        $scope.userID = 0;

    if(!$cookies.get('userID')){
        $window.alert("Please log in first");
        $window.location.href="login.html";
    }

   $http({
     method: 'GET',
     url: "api/order_disp.php",
     params: {uID:$scope.userID}
   }).then(function(response) {
            if(response.data) {
                $scope.order_items = response.data;
            }
            else{
              $scope.noorders = true;
            }
        }, function(response){
            console.log("Error");
    });

    $scope.OrderConfirm = function (){
        $http({
          method: 'GET',
          url: "api/order_place.php",
          params: {uID:$scope.userID}
        }).then(function(response) {
                if(response.data=="Success") {
                   $window.location.href ="/";
                }
            }, function(response){
                console.log("Error");
        });
    };
});
