app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
enabled: true,
requireBase: false
});
		$locationProvider.hashPrefix('*');
    }])
.controller('proCtrl',function($scope,$http,$location,$window,$cookies,$filter){
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
				data: $scope.commentData
			})
				.then(function(data) {
                    if(data.data.success){
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
				data: $scope.commentData
			})
				.then(function(data) {
                    if(data.data.success){
					   $window.location.reload();
                    }
                    else{
                        $window.alert("Error while posting comment Please try again.");
                    }
				});
        }
    }

	$http({
		method: 'GET',
		url: "api/getProductByID.php",
		params: {pid:$location.search().pid}
	}).then(function(response) {
            if(response.data[0].Inactive == 1){
                $window.alert("Sorry this product no longer exists.");
                $window.location.href = "/JustKart";
            }
			$scope.product = response.data;
            $scope.product[0].catName = "";
            $scope.product[0].brandName = "";
            $scope.product[0].shopName = "";
			$http({
				method: 'GET',
				url: 'api/getCatByID.php',
				params: {catid:$scope.product[0].product_cat}
			}).then(function(data) {
                    $scope.product[0].catName = data.data;
                    $scope.catLink=$scope.product[0].catName.split(' ').join('_');
                }, function(response){
                    console.log('error occured1');
                });

            $http({
							method: 'GET',
							url: 'api/getBrandByID.php',
							params: {brandid:$scope.product[0].product_brand}
						}).then(function(data) {
                    $scope.product[0].brandName = data.data;
                    $scope.brandLink=$scope.product[0].brandName.split(' ').join('_');
                }, function(response){
                    console.log('error occured1');
                });

            $http({
							method: 'GET',
							url: "api/getShopByID.php",
							params: {shopid:$scope.product[0].shop_id}
						}).then(function(data) {
                    $scope.product[0].shopName = data.data;
                    $scope.shopLink=$scope.product[0].shopName.split(' ').join('_');
                }, function(response){
                    console.log('error occured1');
                });
            $scope.pro_descp = $scope.product[0].product_descrp.split("~");
		}, function(response){
			console.log('error occured ');
		});

    $http({
			method: 'GET',
			url: 'api/getReviews.php',
			params: {pid:$location.search().pid}
		}).then(function(response) {
			$scope.reviews = response.data;
            $scope.tot_comments = $scope.reviews.length;
						if($scope.reviews == 0){
							$scope.reviews.rating = 0;
						}
            for(var i=0; i<$scope.tot_comments; i++){
                $scope.tot_rating +=$filter('num')($scope.reviews[i].rating);
                if($scope.reviews[i].user_ID == $scope.commentData.userID){
                    $scope.notReviewed = false;
                    $scope.commentData.rating = $scope.reviews[i].rating;
                    $scope.commentData.content = $scope.reviews[i].review_content;
                    $scope.commentData.title = $scope.reviews[i].review_title;
                }
            }
						if($scope.tot_comments != 0){
            	$scope.tot_rating /=$scope.tot_comments;
						}
		}, function(response){
			console.log('error occured ');
		});

    $http({
			method: 'GET',
			url: 'api/getSimilar.php',
			params: {pid:$location.search().pid}
		}).then(function(response) {
			$scope.similar = response.data;
            $scope.similars.push($scope.similar);
		}, function(response){
			console.log('error occured ');
		});

    $scope.reload = function(data) {
        $window.location.href = "/product-details.html#/?pid="+data;
        $window.location.reload();
    }
});
