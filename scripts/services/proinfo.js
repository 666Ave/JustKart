app.factory('proinfo',function(){
	var proinfo = {};
	proinfo.brands = [];
	proinfo.cats = [];
	proinfo.brand = "hey";
	proinfo.cat = "yo";
	
	proinfo.storeBrands = function(newObj){
		proinfo.brands = newObj;
	}
	
	proinfo.getBrands = function(){
		return(proinfo.brands);
	}
	
	proinfo.storeCats = function(newObj){
		proinfo.cats = newObj;
	}
	
	proinfo.getCats= function(){
		return(proinfo.cats);
	}
	
	return proinfo;
});