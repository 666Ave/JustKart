app.factory('authFact',function($cookies){
	var authFact = {};
	authFact.uid = '';
	authFact.setAccessToken = function(accessToken) {
		$cookie.put('accessToken',accessToken);
	};
	
	authFact.getAccessToken = function() {
		authFact.authToken = $cookies.get('accessToken');
		return authFact.authToken;
	};
	
	authFact.getUserName = function() {
		var userObj = $cookies.get('userObj');
		
		if(userObj)
			return userObj;
		else 
			return false;
	};
	
	return authFact;
});