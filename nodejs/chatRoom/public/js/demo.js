var app = angular.module('demo', ['demo.services']);

app.controller('EmailController', ['$scope', '$interpolate', function($scope, $interpolate){
    $scope.$watch('emailBody', function(body){
        if(body){
            var template = $interpolate(body);
            $scope.previewText = template({to: $scope.to});
        }
    });
}]);

app.directive('myDirective', function(){
    return {
        restrict: 'A',
        replace: false,
        template: '<input type="text" ng-model="name" /><a href="{{ myUrl }}">{{ name }}</a>',
        scope: {
            name: '@',
            myUrl: '@'
        }
    }
});

app.controller('ParentController', ['$scope', function($scope){
    $scope.someValue = 'Hello, computer!';
    $scope.someAction = function(){
        this.someValue = 'Parent controller change the value!';
    };
}]);

app.controller('ChildController', ['$scope', function($scope){
    // $scope.someValue = 'Hello, computer123!';
    $scope.someAction = function(){
        this.someValue = 'Child controller change the value!';
    };
}]);

app.directive('newDirective', function(){
    return {
        restrict: 'A',
        template: 'Inside directive,k isolate scope: {{ myProperty }}',
        scope: { }
    }
});

app.directive('newInheritScopeDirective', function(){
    return {
        restrict: 'A',
        template: 'Inside directive,k isolate scope: {{ myProperty }}',
        scope: true   
    }
});

var appService = angular.module('demo.services', []);
appService.factory('githubService', ['$http', function($http){
    var githubUrl = 'http://api/github.com';
    var runUserRequest = function(username, path){
        return $http({
            method: 'JSONP',
            url: githubUrl + '/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
        });
    };

    return {
        events: function(username){
            return runUserRequest(username, 'events');
        }
    }

}]);

appService.factory('alertService', [function(){
    return {
        alert: function(){
            alert("alertService: alert ");
        }
    }
}]);

app.controller('ServiceController', ['$scope', '$timeout', 'githubService', 'alertService', function($scope, $timeout, githubService, alertService){
    alertService.alert();
    $scope.$watch('username', function(newUsername){
        if(newUsername){
            if(timeout){
                $timeout.cancel(timeout);
            }
            var timeout = $timeout(function(){
                githubService.events(newUsername)
                .success(function(data, status, headers){
                    $scope.events = data.data;
                });
            }, 1000);
        }
    });
}]);

