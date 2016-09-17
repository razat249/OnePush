'use strict';

var app = angular.module('onePush', []);

app.controller('ListCtrl', ['$http', '$scope', function($http, $scope) {
	$scope.loading = true;
	$scope.serverError = false;
	$scope.likes = 0;
	$scope.incrLike = function() {
		$scope.likes++;
	}

	$http.get('https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites').then(function(data) {
		$scope.peopleList = data.data.websites;
		$scope.loading = false;
		$scope.noOfSites = data.data.websites.length;
	}, function() {
		$scope.loading = false;
		$scope.serverError = true;
		$scope.errorMessage = "Something went wrong. Try reloading :)";
	});
}]);

app.controller('FormCtrl', ['$http', '$scope', function($http, $scope) {
	$scope.submit = function() {
		var person = $scope.person;
		$scope.success = false;
		$http.get('https://hackerearth.0x10.info/api/one-push?type=json&query=push&title='+ person.title +'&url='+person.url+'&tag='+person.tag).then(
		function(data) {
			if (data.data.status == 200) {
				$scope.success = true
				$scope.person = {};
				$scope.postStatus = "Post Successful! To post another website, come back after one hour :)"			
			} else {
				$scope.postStatus = "Can not post, try again later!";
				$scope.person = {};
			}
		}, function(data) {
			console.log("Server Error");
		});
	}
}]);