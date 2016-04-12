app.controller('orderCtrl',function($scope,$http,$cookies,$window,$location){

    $scope.oconfirm = $location.search().order;
    if($cookies.get('userID'))
        $scope.userID = $cookies.get('userID');
    else
        $scope.userID = 0;
    
    if(!$cookies.get('userID')){
        $window.alert("Please log in first");
        $window.location.href="login.html";
    }
    
   $http.get("api/order_disp.php",{params:{uID:$scope.userID}})
        .success(function(response) {
            if(response) {
                $scope.order_items = response;
            }
        })
        .error(function(response){
            console.log("Error");
    });        
    
    $scope.OrderConfirm = function (){
        $http.get("api/order_place.php",{params:{uID:$scope.userID}})
            .success(function(response) {
                if(response=="Success") {
                   $window.location.href ="/";
                }
            })
            .error(function(response){
                console.log("Error");
        });
    };
});