'use strict';

var app = angular.module('onePush', []);

app.controller('ListCtrl', ['$http', '$scope', function($http, $scope) {
	$scope.loading = true;
	$scope.serverError = false;
	$http.get('https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites').then(function(data) {
		$scope.peopleList = data.data.websites
		console.log(data);
		$scope.loading = false;
	}, function() {
		$scope.loading = false;
		$scope.serverError = true;
		$scope.errorMessage = "Can not fatch data from server. Try reloading :)";
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
				$scope.postStatus = "Post Successful! To post another website, come back after one hour :)"			
			} else {
				$scope.postStatus = "Can not post, try again later!"
			}
		}, function(data) {
			console.log("Server Error");
		});
	}
}]);