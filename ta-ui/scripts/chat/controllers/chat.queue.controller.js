/**
 * Created by mayureshp on 2/17/2015.
 */

angular.module("chat").
    controller("ChatQueueController", ['$scope', '$firebase', function ($scope, $firebase) {
        console.log("In controller");

        $scope.sessionkey = "";
        $scope.count = 0;

        var button = document.createElement("button");
        button.innerHTML = "Do Something";

        // 2. Append somewhere
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(button);



        // fucking changes the session
        var firebaseUrl = "https://tutor-chat.firebaseio.com/Queues";
        var chatRef = new Firebase(firebaseUrl);
        var sync = $firebase(chatRef);

        // 3. Add event handler
        button.addEventListener ("click", function() {
          $scope.chat_messages = sync.$asArray();
          $scope.chat_messages.$add({subject: $scope.count, message: $scope.sessionkey, $priority: Date.now()});
          $scope.new_message = "";
        });

    }]);
