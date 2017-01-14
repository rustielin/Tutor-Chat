from firebase import firebase

FIREBASE_URL = "https://tutor-chat.firebaseio.com/"

# Main
if __name__ == '__main__':

    # with num as open("numbers.txt", "r+"):
    #     counter = num.nextline()
    #     counter += 1
    #     num.write(counter)

    fb = firebase.FirebaseApplication(FIREBASE_URL, None) # Create a reference to the Firebase Application

    data = raw_input("Input Data: ") # Get data from terminal

    fb.put('/Sessions/Node1', "Data", data) # Add data to Node Node1
