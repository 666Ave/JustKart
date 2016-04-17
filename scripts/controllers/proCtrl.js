app.controller('proCtrl',function($scope,$http,$location,$window,$cookies,$filter){
	var self=this; 
    
    $scope.notReviewed = true;
    $scope.similars = [];
    $scope.commentData = {};
    $scope.commentData.userID = $cookies.get('userID');
    $scope.commentData.pID = $location.search().pid;  
    $scope.tot_rating = 0;
    $scope.tot_comments = 0;  
    $scope.commentData.rating = 1;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };
    
    $scope.postComment = function() {
        if(!$cookies.get('userID')){
			$window.alert("Please log in first");
            $cookies.put('curr',$window.location.pathname+$window.location.hash);
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
        if($cookies.get('userType') == "seller"){
            $window.alert("Sellers cant post reviews.");
            return 0;
        }
        if($cookies.get('userType') == "admin"){
            $window.alert("Admins have better other work to do.");
            return 0;
        }
        if(!$scope.notReviewed){ 
            $http({
				method: 'POST',
				url: 'api/processReview.php',
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
        else{
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
    }
    
	$http.get("api/getProductByID.php",{params:{pid:$location.search().pid}})
		.success(function(response) {
			$scope.product = response;
            $scope.product[0].catName = "";
            $scope.product[0].brandName = "";
            $scope.product[0].shopName = "";
			$http.get("api/getCatByID.php",{params:{catid:$scope.product[0].product_cat}})
                .success(function(data) {
                    $scope.product[0].catName = data;
                    $scope.catLink=$scope.product[0].catName.split(' ').join('_');
                })
                .error(function(response){
                    console.log('error occured1');
                });

            $http.get("api/getBrandByID.php",{params:{brandid:$scope.product[0].product_brand}})
                .success(function(data) {
                    $scope.product[0].brandName = data;
                    $scope.brandLink=$scope.product[0].brandName.split(' ').join('_');
                })
                .error(function(response){
                    console.log('error occured1');
                });
            $http.get("api/getShopByID.php",{params:{shopid:$scope.product[0].shop_id}})
                .success(function(data) {
                    $scope.product[0].shopName = data;
                    $scope.shopLink=$scope.product[0].shopName.split(' ').join('_');
                })
                .error(function(response){
                    console.log('error occured1');
                });
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
                if($scope.reviews[i].user_ID == $scope.commentData.userID){
                    $scope.notReviewed = false;
                    $scope.commentData.rating = $scope.reviews[i].rating;
                    $scope.commentData.content = $scope.reviews[i].review_content;
                    $scope.commentData.title = $scope.reviews[i].review_title;
                }
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
    
    $scope.reload = function(data) {
        $window.location.href = "/product-details.html#/?pid="+data;
        $window.location.reload();
    }
});