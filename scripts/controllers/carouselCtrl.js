app.controller('carouselCtrl',function($scope){
	$scope.Data= [
			{
				active: 'item active',
				title: 'Local online shopping site',
				tagline: 'Exprience fast delivery and local shop discount at your fingertips.',
				img1 :'images/home/girl1.jpg',
			},
			{
				active: 'item',
				title: '100% Positive Customer Feedback',
				tagline: 'Only my parents complain both the electricity bill but that\'s it.',
				img1 :'images/home/girl2.jpg',
			},
			{
				active: 'item',
				title: '7 Day return Policy',
				tagline: 'Yes, no one can cheat you now!!',
				img1 :'images/home/girl3.jpg',
			}
		];
});