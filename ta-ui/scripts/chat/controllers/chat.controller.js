/**
 * Created by mayureshp on 2/17/2015.
 */

angular.module("chat").
    controller("ChatController", ['$scope', '$firebase', function ($scope, $firebase) {
        console.log("In controller");

        $scope.username = "";

        var firebaseUrl = "https://tutor-chat.firebaseio.com/Queues";
        var chatRef = new Firebase(firebaseUrl);


        var sync = $firebase(chatRef);
        //initialize messages just in case
        $scope.chat_messages = sync.$asArray();

        chatRef.on('value', function(snapshot) {
          // var snap = snapshot.child();
          // console.log("VALLL  " + snap.name);
            snapshot.forEach(function(childSnapshot) {
              var childData = childSnapshot.val();
              var queue = childData.name;
              if (queue === parseInt(queue, 10)) {
                // alert(queue);
                $scope.queue = queue;
                return;
              }
            });
        });

        $scope.kill_queue = function() {
          chatRef.child($scope.queue).remove();
        }
        $scope.newMessageKeyPress = function(keyEvent) {
            // whenever enter
            if (keyEvent.which === 13) {

                // $scope.kill_queue();

                var firebaseUrl_message = "https://tutor-chat.firebaseio.com/Sessions" + "/" + $scope.queue;
                var chatRef_message = new Firebase(firebaseUrl_message);
                var sync = $firebase(chatRef_message);

                console.log("Enter clicked : " + $scope.new_message);
                $scope.chat_messages = sync.$asArray();

                if ($scope.new_message != "") {
                    $scope.chat_messages.$add({name: $scope.username, message: $scope.new_message, $priority: Date.now()});
                    $scope.new_message = "";
                }
            }
        }

    }]);
