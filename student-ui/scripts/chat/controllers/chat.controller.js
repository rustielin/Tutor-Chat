/**
 * Created by mayureshp on 2/17/2015.
 */

angular.module("chat").
    controller("ChatController", ['$scope', '$firebase', function ($scope, $firebase) {
        console.log("In controller");
        // var firebaseUrl = "https://tutor-chat.firebaseio.com/Sessions/Messages";

        $scope.sessionkey = Math.floor(Math.random() * 2147483647);
        $scope.username = "Your name here:";


        // fucking changes the session
        var firebaseUrl = "https://tutor-chat.firebaseio.com/Sessions"+ "/" + $scope.sessionkey;
        var chatRef = new Firebase(firebaseUrl);
        var sync = $firebase(chatRef);

        $scope.newMessageKeyPress = function(keyEvent) {
            // whenever enter
            if (keyEvent.which === 13) {
                // generate teh queue
                var firebaseUrl_queue = "https://tutor-chat.firebaseio.com/Queues"+ "/" + $scope.sessionkey;
                var queueRef = new Firebase(firebaseUrl_queue);
                queueRef.set({name: $scope.username})


                console.log("Enter clicked : " + $scope.new_message);

                $scope.chat_messages = sync.$asArray();

                $scope.chat_messages.$add({name: $scope.username, message: $scope.new_message, $priority: Date.now()});
                $scope.new_message = "";
            }
        }

    }]);
