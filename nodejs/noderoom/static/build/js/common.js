var app = angular.module('Sorgo', []);

app.controller('msgController', ['$scope', function($scope){
    $scope.send = function(){
        console.log('send!' + $scope.msg);
        console.log(socket);
        socket.emit('send msg', $scope.msg);
    }
}]);