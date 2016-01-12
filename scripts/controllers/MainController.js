app.controller('MainController',function($scope,$http){
    $http.get("api/getCat.php")
        .success(function(response) {
            $scope.category = response;
        })
        .error(function(response){
            console.log('error occured');
        }); 
});