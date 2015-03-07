var app = angular.module('demo', []);

app.controller('EmailController', ['$scope', '$interpolate', function($scope, $interpolate){
    $scope.$watch('emailBody', function(body){
        if(body){
            var template = $interpolate(body);
            $scope.previewText = template({to: $scope.to});
        }
    });
}]);