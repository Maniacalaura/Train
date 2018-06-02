//this is the api info from our firebase database, that will store all the info on our monorail!
var config = {
  apiKey: "AIzaSyCcWG2Xztb4azz9ZJLk-zsFxGpjYGQVYrc",
  authDomain: "train-homework-2b17f.firebaseapp.com",
  databaseURL: "https://train-homework-2b17f.firebaseio.com/",
  projectId: "train-homework-2b17f",
  storageBucket: "train-homework-2b17f.appspot.com",
  messagingSenderId: "828608583064"
};

firebase.initializeApp(config); 

var database = firebase.database();

//upon clicking the submit button, the event begins. The event allows us to add monorails to the schedule
$("#addMono").on("click", function (event) {
  event.preventDefault();
//these vars will collect the user input
var monoName = $("#mono-input").val().trim();
var monoDest = $("#dest-input").val().trim();
var firstMono = moment($("#first-input").val().trim(), "HH:mm").format("x");
var monoFreq = $("#freq-input").val().trim();
//this var will hold our info temporarily
var newMono = {
    name: monoName,
    dest: monoDest,
    first: firstMono,
    freq: monoFreq
  };
//now that we've gathered the user input and stored it temporarily in newMono, we can push it to firebse
database.ref().push(newMono);
 
  console.log(newMono.name);
  console.log(newMono.dest);
  console.log(newMono.first);
  console.log(newMono.freq);

//once we add a monorail we want the form to reset, this code removes all the data from the form
  $("#mono-input").val("");
  $("#dest-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});
//this firebase event will add the new monorails to the database and create a new row in the schedule
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var monoName = childSnapshot.val().name;
  var monoDest = childSnapshot.val().dest;
  var firstMono = childSnapshot.val().first;
  var monoFreq = childSnapshot.val().freq;

  console.log(monoName);
  console.log(monoDest);
  console.log(firstMono);
  console.log(monoFreq);

// we push back 1 year so it doesn't go into negative minutes
var firstMonoConverted = moment(firstMono, "HH:mm").subtract(1, "years");
console.log(firstMonoConverted);

// this garbs our current time 
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm:"));

// now we calculate the difference between the times
var diffTime = moment().diff(moment(firstMonoConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// the remainder
var tRemainder = diffTime % monoFreq;
console.log(tRemainder);

nextArrival = moment().add(tRemainder, "minutes");
nextArrival = moment(nextArrival).format("HH:mm A");

//and now the mintes to next train
var minToMono = monoFreq - tRemainder;
console.log("MINUTES TILL TRAIN: " + minToMono);

//next Train
var nextMono = moment().add(minToMono, "minutes");
console.log("ARRIVAL TIME: " + moment(nextMono).format("HH:mm"));

//this displays all the data inside the table by creating a table row and table data
$("#mono-table > tbody").append("<tr><td>" + monoName + "</td><td>" + monoDest + "</td><td>" +
monoFreq + "</td><td>" + nextArrival + "</td><td>" + minToMono + "</td><td>");

});
