var app = angular.module('Category', []);


app.controller('CategoryController', function($scope, $http){
    $scope.loading = false;
    $scope.category = null;
    $scope.newSubcategory = '';

    $scope.init = function() {
    	var requestInfo = parseLocation('site');
    	console.log('CategoryController: INIT'+JSON.stringify(requestInfo));
    	var categoryId = requestInfo['identifier'];
    	if (categoryId==null){
    		alert('Missing Category Identifier');
    		return;
    	}
    	
    	fetchCategory(categoryId);
    }

    function fetchCategory(categoryId){
        var url = '/api/categories/'+categoryId;
        $http.get(url).success(function(data, status, headers, config) {
            var results = data['results'];
            var confirmation = results['confirmation'];
            if (confirmation != 'success'){
                alert(results['message']);
                return;
            }
            
        	$scope.category = results['category'];
        	console.log('CATEGORY: '+JSON.stringify($scope.category));

        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
    }
    
    $scope.addSubcategory = function(){
    	console.log('addSubcategory: '+$scope.newSubcategory);
    	
    	if ($scope.newSubcategory.length==0){
    		alert('Please add a new subcategory');
    		return;
    	}
    	
    	$scope.category.subcategories.push($scope.newSubcategory);
    	$scope.newSubcategory = '';
    }
    
    $scope.updateCategory = function(){
    	var json = JSON.stringify($scope.category);
    	console.log('updateCategory: '+json);
    	
        var url = '/api/categories/'+$scope.category.id;
        $http.put(url, json).success(function(data, status, headers, config) {
            var results = data['results'];
            if (results['confirmation'] != 'success'){
                alert(results['message']);
                return;
            }
            
            console.log("CATEGORY UPDATED: "+JSON.stringify(results));
            alert("CATEGORY UPDATED");
            
            $scope.loading = false;
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
    	
    }
    
    
    $scope.capitalize = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $scope.formattedDate = function(dateStr) {
    	date = moment(new Date(dateStr)).format('MMM D, h:mm a');
    	return date;
    }

    function parseLocation(stem){
    	console.log('PARSE LOCATION: '+stem);
    	var resourcePath = location.href.replace(window.location.origin, ''); // strip out the domain root (e.g. http://localhost:8888)

    	var parts = resourcePath.split(stem+'/');
    	requestInfo = {"resource":null, "identifier":null, 'params':{}};
    	if (parts.length > 1){
    		var hierarchy = parts[1].split('/');
    		for (var i=0; i<hierarchy.length; i++){
    			if (i==0){
    				requestInfo['resource'] = hierarchy[0];
    			}

    			if (i==1) {
    			    requestInfo['identifier'] = hierarchy[i].split('?')[0];
    			}
    		}
    	}

    	return requestInfo;
    }



});


