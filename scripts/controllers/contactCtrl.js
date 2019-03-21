app.controller('contactCtrl',function($scope,$http,$window,$cookies){

    $scope.contactData = {};
    if($cookies.get('userID')){
        $http({
    			method: 'GET',
    			url: "api/user_info.php",
    			params: {uID:$cookies.get('userID')}
    		}).then(function(response) {
                $scope.contactData.Name = response['Name'];
                $scope.contactData.Email = response['email'];

            }, function(response){
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
				.then(function(data) {
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
				.then(function(data) {
                    if(data){
					   $window.alert(data);
                    }
                    else{
                        $window.alert("Error while posting.....Please try again.");
                    }
				});
    }
});
