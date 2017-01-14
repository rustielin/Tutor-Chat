/**
 * Created by mayureshp on 2/17/2015.
 */

angular.module("chat").
    controller("ChatController", ['$scope', '$firebase', function ($scope, $firebase) {
        console.log("In controller");
        // var firebaseUrl = "https://tutor-chat.firebaseio.com/Sessions/Messages";

        $scope.sessionkey = "Session key here:";
        $scope.username = "New User";

        $scope.newMessageKeyPress = function(keyEvent) {
            // whenever enter
            if (keyEvent.which === 13) {
                console.log("Enter clicked : " + $scope.new_message);

                // fucking changes the session
                var firebaseUrl = "https://tutor-chat.firebaseio.com/Sessions"+ "/" + $scope.sessionkey;
                var chatRef = new Firebase(firebaseUrl);
                var sync = $firebase(chatRef);

                $scope.chat_messages = sync.$asArray();

                $scope.chat_messages.$add({name: $scope.username, message: $scope.new_message, $priority: Date.now()});
                $scope.new_message = "";
            }
        }

    }]);
