/**
 * Created by mayureshp on 2/17/2015.
 */

angular.module("chat").
    factory("ChatService", ["$firebase", function($firebase) {
        console.log("In service");
        var firebaseUrl = "https://tutor-chat.firebaseio.com/Sessions/Track";
        var chatRef = new Firebase(firebaseUrl);

        chatRef.on("child_added", function(snapshot) {
            var chat_message = snapshot.val();
            console.log("Chat message = " + chat_message);
        })

    }]);
