var connected = false;
var firebaseUrl_message;
var chatRef_message;
var sync_message;

angular.module("chat").
    controller("ChatController", ['$scope', '$firebase', function ($scope, $firebase) {
        console.log("In controller");

        $scope.username = "TA";

        var firebaseUrl = "https://tutor-chat.firebaseio.com/Queues";
        var chatRef = new Firebase(firebaseUrl);

        var sync = $firebase(chatRef);
        //initialize messages to see available students
        $scope.chat_messages = sync.$asArray();

        chatRef.on('value', function(snapshot) {
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

        // connect with some guy via queue, start a chat session, then kill his queue
        $scope.connectQueue = function() {
          chatRef.on('value', function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                var queue = childData.name;
                if (queue === parseInt(queue, 10)) {
                  // alert(queue);
                  $scope.queue = queue;
                  document.getElementById("privatechatheader").innerHTML='New Student Connected';
                  return;
                }
              });
          });
          connected = false;
        }

        $scope.kill_queue = function() {
          chatRef.child($scope.queue).remove();
        }

        $scope.newMessageKeyPress = function(keyEvent) {
            // whenever enter
            if (keyEvent.which === 13) {

              if (!connected) {
                firebaseUrl_message = "https://tutor-chat.firebaseio.com/Sessions" + "/" + $scope.queue;
                chatRef_message = new Firebase(firebaseUrl_message);
                sync_message = $firebase(chatRef_message);
                $scope.kill_queue();
                document.getElementById("privatechatheader").innerHTML='Student Private Chat'
                connected = true;
              }

                console.log("Enter clicked : " + $scope.new_message);
                $scope.chat_messages = sync_message.$asArray();

                // no empty string messages
                if ($scope.new_message != "") {
                    $scope.chat_messages.$add({name: $scope.username, message: $scope.new_message, priority: Date.now()});
                    $scope.new_message = "";
                }
            }
        }

    }]);
