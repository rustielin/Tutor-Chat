/**
 * Created by mayureshp on 2/17/2015.
 */

angular.module("chat").
    controller("ChatController", ['$scope', '$firebase', function ($scope, $firebase) {
        console.log("In controller");

        $scope.username = "TA";
        $scope.connected = false;

        var firebaseUrl = "https://tutor-chat.firebaseio.com/Queues";
        var chatRef = new Firebase(firebaseUrl);
        var sync = $firebase(chatRef);
        $scope.sync_messages; //for later
        //initialize messages just in case
        $scope.chat_messages = sync.$asArray();

        $scope.connectNewQueue = function() {
            chatRef.on('value', function(snapshot) {
              // var snap = snapshot.child();
              // console.log("VALLL  " + snap.name);
                snapshot.forEach(function(childSnapshot) {
                  var childData = childSnapshot.val();
                  var queue = childData.name;
                  if (queue === parseInt(queue, 10)) {
                    $scope.queue = queue;
                    return;
                  }
                });
            });
            var firebaseUrl_message = "https://tutor-chat.firebaseio.com/Sessions" + "/" + $scope.queue;
            var chatRef_message = new Firebase(firebaseUrl_message);
            $scope.sync_messages = $firebase(chatRef_message);
            alert($scope.sync_messages);
            chatRef.child($scope.queue).remove();
            $scope.connected = true;
        }

        $scope.newMessageKeyPress = function(keyEvent) {
            // whenever enter
            if (keyEvent.which === 13) {

                // var firebaseUrl_message = "https://tutor-chat.firebaseio.com/Sessions" + "/" + $scope.queue;
                // var chatRef_message = new Firebase(firebaseUrl_message);
                // var sync = $firebase(chatRef_message);
                console.log($scope.sync_messages)
                console.log("Enter clicked : " + $scope.new_message);
                $scope.chat_messages = sync_messages.$asArray();

                if ($scope.new_message != "") {
                    $scope.chat_messages.$add({name: $scope.username, message: $scope.new_message, $priority: Date.now()});
                    $scope.new_message = "";
                }
            }
        }

    }]);
