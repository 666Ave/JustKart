app.controller('orderCtrl',function($scope,$http,$location){
 
    if($location.search().order==true){
        $scope.oconfirm = true;
    }
    else{
        $scope.oconfirm = false;
    }
    
    $http.get("api/user_info.php",{params:{uID:$scope.userID}})
        .success(function(response) {
            if(response.user) {
            }
        })
        .error(function(response){
            console.log("Error");
    });

});