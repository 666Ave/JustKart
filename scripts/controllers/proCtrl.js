app.controller('proCtrl',function($scope,$http,$location,proinfo){
	var self=this;
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
		})
		.error(function(response){
			console.log('error occured');
		});
	
});