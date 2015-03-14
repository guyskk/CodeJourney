app.controller('MsgController', ['$scope', 'socket', function($scope, socket){
    $scope.newMsg = '';
    socket.on('connected', function(){
    });
    $scope.createMsg = function(){
        if($scope.newMsg == ''){
            return false;
        }
        socket.emit('createMsg', $scope.newMsg);
        $scope.newMsg = '';
    }
}]);