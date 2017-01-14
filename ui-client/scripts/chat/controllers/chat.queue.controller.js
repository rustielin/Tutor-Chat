/**
 * Created by mayureshp on 2/17/2015.
 */

angular.module("chat").
    controller("ChatQueueController", ['$scope', '$firebase', function ($scope, $firebase) {
        console.log("In controller");

        $scope.sessionkey = "Session key here:";
        $scope.subject = "Subject:";

        // var btn = document.createElement("BUTTON");        // Create a <button> element
        // var t = document.createTextNode("CLICK ME");       // Create a text node
        // btn.appendChild(t);                                // Append the text to <button>
        // document.body.appendChild(btn);

        var button = document.createElement("button");
        button.innerHTML = "Do Something";

        // 2. Append somewhere
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(button);

        // 3. Add event handler
        button.addEventListener ("click", function() {
          alert("did something");
        });

        // fucking changes the session
        var firebaseUrl = "https://tutor-chat.firebaseio.com/Queues";
        var chatRef = new Firebase(firebaseUrl);
        var sync = $firebase(chatRef);

        $scope.newMessageKeyPress = function(keyEvent) {
            // whenever enter
            if (keyEvent.which === 13) {
                console.log("Enter clicked : " + $scope.new_message);

                $scope.chat_messages = sync.$asArray();

                $scope.chat_messages.$add({subject: $scope.subject, message: $scope.new_message, $priority: Date.now()});
                $scope.new_message = "";
            }
        }

    }]);
