// 大厅

app.controller('HallController', ['$scope', 'socket', function($scope, socket){
    $scope.messages = [];

    socket.on('connected', function(){
        console.log('有人进入了大厅');
    });

    socket.emit('getAllMessages');

    socket.on('allMessages', function (msg) {
        console.log('allMessage');
        $scope.messages = msg;
    });

    socket.on('messageAdded', function (msg) {
        $scope.messages = msg;
        console.log($scope.messages);
    });

}]);
