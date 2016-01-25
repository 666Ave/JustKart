app.controller('InsertCtrl',function($scope,$http){
    $http.get("../api/getCat.php")
        .success(function(response) {
            $scope.category = response;
        console.log($scope.category)
        })
        .error(function(response){
            console.log('error occured1');
        });
    
    $http.get("../api/getBrand.php")
        .success(function(response) {
            $scope.brands = response;
        })
        .error(function(response){
            console.log('error occured2');
        });
    console.log($scope.category)
});