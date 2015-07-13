var app = angular.module('Categories', []);


app.controller('CategoriesController', function($scope, $http){
    $scope.loading = false;
    $scope.categories = null;
    $scope.newCategory = {'name':''};

    $scope.init = function() {
    	console.log('CategoriesController: INIT');
    	fetchCategories();
    }

    function fetchCategories(){
        var url = '/api/categories';
        $http.get(url).success(function(data, status, headers, config) {
            var results = data['results'];
            var confirmation = results['confirmation'];
            if (confirmation=='success'){
            	$scope.categories = results['categories'];
            	console.log('CATEGORIES: '+JSON.stringify($scope.categories));
            	
            }
            else {
                alert(results['message']);
            }

        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
    }
    
    $scope.createCategory = function() {
    	
        var json = JSON.stringify($scope.newCategory);
    	console.log('ADD Category: '+json);
    	
    	
        $scope.loading = true;

        var url = '/api/categories/';
        $http.post(url, json).success(function(data, status, headers, config) {
            $scope.loading = false;
            var results = data['results'];
            var confirmation = results['confirmation'];
            if (confirmation=='success'){
            	var newCategory = results['category'];
            	$scope.categories.push(newCategory);
            	
                $scope.newCategory = {'name':''};

//                console.log("VENUE UPDATED: "+JSON.stringify(results));
//                alert("VENUE UPDATED");
//            	$scope.profile = results['profile'];
            }
            else {
                alert(results['message']);
            }
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
    }

    
    $scope.updateCategory = function(index) {
    	var category = $scope.categories[index];
        var json = JSON.stringify(category);
        
    	console.log('Update Category: '+json);
    	
    	
    	
        var url = '/api/venues/'+venue.id;
        $http.put(url, json).success(function(data, status, headers, config) {
            results = data['results'];
            confirmation = results['confirmation'];
            if (confirmation=='success'){
                console.log("VENUE UPDATED: "+JSON.stringify(results));
                alert("VENUE UPDATED");
//            	$scope.profile = results['profile'];
            }
            else {
                alert(results['message']);
            }
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




});


