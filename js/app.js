'use strict';

var app = angular.module('onePush', []);

app.controller('ListCtrl', ['$http', '$scope', function($http, $scope) {
	$http.get('https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites').success(function(data) {
		$scope.peopleList = data.websites
		console.log(data)
	});
}]);