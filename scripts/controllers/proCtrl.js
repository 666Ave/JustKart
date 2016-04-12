app.controller('proCtrl',function($scope,$http,$location,$window,$cookies,$filter,proinfo){
	var self=this; 
    
    $scope.similars = [];
    $scope.commentData = {};
    $scope.commentData.rating = 1;
    $scope.commentData.userID = $cookies.get('userID');
    $scope.commentData.pID = $location.search().pid;
    $scope.rating = 0;
    $scope.tot_rating = 0;
    $scope.tot_comments = 0;
    $scope.ratings = {
        current: 1,
        max: 5
    };
    $scope.getSelectedRating = function (rating) {
        $scope.commentData.rating = rating;
    }
    
    $scope.postComment = function() {
        if(!$cookies.get('userID')){
			$window.alert("Please log in first");
			$window.location.href = '/login.html';
		}
        if(!$scope.commentData.content){
            $window.alert("Please write a review before posting.");
            return 0;
        }
        if(!$scope.commentData.title){
            $window.alert("Please write a title for the review before posting.");
            return 0;
        }
        $http({
				method: 'POST',
				url: 'api/postComment.php',
				data: $.param($scope.commentData),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.success(function(data) {
                    if(data.success){
					   $window.location.reload();
                    }
                    else{
                        $window.alert("Error while posting comment Please try again.");
                    }
				});
    }
    
	$http.get("api/getProductByID.php",{params:{pid:$location.search().pid}})
		.success(function(response) {
			$scope.product = response;
			self.pBrand=proinfo.getBrands();	//get the brands
			for(var i=0; i<self.pBrand.length; i++) {
				if(self.pBrand[i].brand_id == $scope.product[0].product_brand){
					$scope.pBrand=self.pBrand[i].brand_title;//get the brand title
					break;
				}
			}
			self.pCat=proinfo.getCats();	//get the categories
			for(var i=0; i<self.pCat.length; i++) {
				if(self.pCat[i].cat_id == $scope.product[0].product_cat){
					$scope.pCat=self.pCat[i].cat_title;	//get the category title
					break;
				}
			}
            $scope.pro_descp = $scope.product[0].product_descrp.split("~");
		})
		.error(function(response){
			console.log('error occured ');
		});
	
    $http.get("api/getReviews.php",{params:{pid:$location.search().pid}})
		.success(function(response) {
			$scope.reviews = response;
            $scope.tot_comments = $scope.reviews.length;
            for(var i=0; i<$scope.tot_comments; i++){
                $scope.tot_rating +=$filter('num')($scope.reviews[i].rating);
            }
            $scope.tot_rating /=$scope.tot_comments;
		})
		.error(function(response){
			console.log('error occured ');
		});
    
    $http.get("api/getSimilar.php",{params:{pid:$location.search().pid}})
		.success(function(response) {
			$scope.similar = response;
            $scope.similars.push($scope.similar);
		})
		.error(function(response){
			console.log('error occured ');
		});  
});