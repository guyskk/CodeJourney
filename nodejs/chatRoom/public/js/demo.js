var app = angular.module('demo', []);

app.run(function($rootScope){
    $rootScope.rootProperty = 'Root Scope';
});


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