app.controller('proCtrl',function($scope,$http,$location,$filter,proinfo){
	var self=this; 
    
    $scope.rating = 0;
    $scope.tot_rating = 0;
    $scope.tot_comments = 0;
    $scope.ratings = {
        current: 3,
        max: 5
    };
    $scope.getSelectedRating = function (rating) {
        console.log(rating);
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
});