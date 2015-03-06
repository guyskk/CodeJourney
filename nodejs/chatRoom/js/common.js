var app = angular.module('myApp', []);
// app.run(function($rootscope){
// 	$rootscope.name = 'zhanglun';
// });

app.controller('myController', ['$scope', function($scope){
	$scope.person = {
		name: 'zhanglun'
	};
}]);