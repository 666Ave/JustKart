app.controller('contactCtrl',function($scope,$http,$window,$cookies){

    $scope.contactData = {};
    if($cookies.get('userID')){
        $http.get("api/user_info.php",{params:{uID:$cookies.get('userID')}})
            .success(function(response) {
                $scope.contactData.Name = response['Name'];
                $scope.contactData.Email = response['email'];
            
            })
            .error(function(response){
                console.log('error occured ');
            });
    }
    
    $scope.postContact = function() {
        if(!$scope.contactData.Name || !$scope.contactData.Email || !$scope.contactData.subject || !$scope.contactData.message ){
            $window.alert("Please fill all the fields before submitting.");
            return 0;
        }
        $http({
				method: 'POST',
				url: 'api/postContact.php',
				data: $.param($scope.contactData),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
                    if(data){
					   $window.alert("Success");
                    }
                    else{
                        $window.alert("Error while posting.....Please try again.");
                    }
				});
    }
    
    $scope.postEmail = function() {
        $http({
				method: 'POST',
				url: 'api/sendemail.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
                    if(data){
					   $window.alert(data);
                    }
                    else{
                        $window.alert("Error while posting.....Please try again.");
                    }
				});
    }
});