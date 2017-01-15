angular.module("chat").
    controller("PublicChatController", ['$scope', '$firebase', function ($scope, $firebase) {
        console.log("In controller");

        $scope.sessionkey = "Session key here:";
        $scope.username = "";

        // changes the session
        var firebaseUrl = "https://tutor-chat.firebaseio.com/Sessions/Public";
        var chatRef = new Firebase(firebaseUrl);
        var sync = $firebase(chatRef);

        $scope.chat_messages = sync.$asArray();

        $scope.newMessageKeyPress = function(keyEvent) {
            // whenever enter
            if (keyEvent.which === 13) {
                console.log("Enter clicked : " + $scope.new_message);

                $scope.chat_messages = sync.$asArray();

                if ($scope.new_message != "" && $scope.username != "") {
                    $scope.chat_messages.$add({name: $scope.username, message: $scope.new_message, priority: Date.now()});
                    $scope.new_message = "";
                }
            }
        }

    }]);
