app.controller('MsgController', ['$scope', 'socket', function($scope, socket){
    $scope.newMsg = '';
    $scope.createMsg = function(){
        if($scope.newMsg == ''){
            return false;
        }
        console.log('sending!');
        socket.emit('createMsg', $scope.newMsg);
        $scope.newMsg = '';
    }
}]);