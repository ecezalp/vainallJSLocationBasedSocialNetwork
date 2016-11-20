var config = {
  apiKey: "AIzaSyB0QAJAnXUD3YlpqtSRMll5HpsQkWOc1-U",
  authDomain: "cool-chat-app-ecf70.firebaseapp.com",
  databaseURL: "https://cool-chat-app-ecf70.firebaseio.com",
  storageBucket: ""
};

//upon login

firebase.initializeApp(config);
firebaseDB = firebase.database();

//pulls GPS

var gpsPosition;

navigator.geolocation.getCurrentPosition(function(position) {
	var pos = {
		lat: position.coords.latitude,
		lon: position.coords.longitude
	};
	gpsPosition = `${pos.lat}, ${pos.lon}`
	console.log(gpsPosition)
})

function enterComment(ideaFirebaseEncryptedKey) {
	var replyEntered = $(`#replyEnteredToComment${ideaFirebaseEncryptedKey}`).val()
	console.log(replyEntered)
	console.log(`${ideaFirebaseEncryptedKey}`)
}

//

// setTimeout(function() {
// 	var testingField = {comment: "Let's go eat Chinese Food", pos: gpsPosition, thumbsDown: "330", thumbsUp: "23", timestamp: `${new Date().toLocaleString()}`, replies: {Abby: "Let's go to Han Dyansty", Ece: "No. I'am going to Chinatown"} }
// 	var addingNewFunIdeasToFirebaseUrlPath = new Firebase(`https://cool-chat-app-ecf70.firebaseio.com/fun`)
// 	var addingNewFunIdeasToFirebase = addingNewFunIdeasToFirebaseUrlPath.push(testingField);
// }, 5000)

function showActivities(activity) {
	var funIsBeingLoadedFromFirebase = firebaseDB.ref(activity);

	$(".indexCover").empty();

	var ideaCounter = 1

	funIsBeingLoadedFromFirebase.on("value", function(ideas) {
		ideasList = ideas.val();
		ideasKeyList = Object.keys(ideasList)
		// console.log(ideasList)
		ideasKeyList.forEach(function(ideaFirebaseEncryptedKey) {

			var eachIdea = ideasList[ideaFirebaseEncryptedKey]
			var eachIdeaReplies = ideasList[ideaFirebaseEncryptedKey]["replies"]

			$(".indexCover").append(
				`
				${ideaCounter}</br>
				${eachIdea["comment"]}</br>
				${eachIdea["pos"]}</br>
				${eachIdea["thumbsDown"]}</br>
				${eachIdea["thumbsUp"]}</br>
				${eachIdea["timestamp"]}</br></br>
				`
			)

			eachIdeaReplies.forEach(function(comment) {
				$(".indexCover").append(
					`
					${comment}</br>
					`
				)
			})

			$(".indexCover").append(
				`
				<input id="replyEnteredToComment${ideaFirebaseEncryptedKey}"></input> <button onclick=enterComment("${ideaFirebaseEncryptedKey}")>Reply</button></br>
				`
			)

			ideaCounter += 1;
		})
	})	
}

