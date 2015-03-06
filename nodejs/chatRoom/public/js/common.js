var app = angular.module('myApp', []);

// var api_url = 'http://restcountries.eu/rest/v1/all';

// app.controller('PlayerController', ['$scope', '$http', function($scope, $http){
	
// 	$scope.playing = false;
// 	$scope.audio = document.createElement('audio');

// 	$scope.audio.src = './static/123.mp3';
	
// 	$scope.play = function(){
// 		$scope.audio.play();
// 		$scope.playing = true;
// 	};
	
// 	$scope.stop = function(){
// 		$scope.audio.pause();
// 		$scope.playing = false;
// 	};

// 	$scope.audio.addEventListener('ended', function(){
// 		$scope.$apply(function(){
// 			$scope.stop();
// 		});
// 	});

// }]);

// app.controller('ClockController', ['$scope', function($scope){
// 	$scope.person = {
// 		name:"zhanglun"
// 	};
// 	var updateClock = function(){
// 		$scope.clock = (new Date()).toString();
// 	}

// 	var timer = setInterval(function(){
// 		$scope.$apply(updateClock);
// 	}, 1);
// 	updateClock();
// }]);


// app.controller('CounterController', ['$scope', '$http', function($scope, $http){
// 	$scope.counter = 0;
// 	$scope.add = function(amount){
// 		$scope.counter += amount;
// 	};
// 	$scope.subtract = function(amount){
// 		$scope.counter -= amount;
// 	};
// }]);

// app.controller('ParentController', ['$scope', function($scope){
// 	$scope.person = {greeted: false};
// }])

// app.controller('ChildController', ['$scope', function($scope){
// 	$scope.sayHello = function(){
// 		// $scope.person.name = 'Ari Lerner';
// 		$scope.person = {greeted: false};
// 	};
// }]);
