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


$("#addMono").on("click", function (event) {
  event.preventDefault();

var monoName = $("#mono-input").val().trim();
var monoDest = $("#dest-input").val().trim();
var firstMono = moment($("#first-input").val().trim(), "HH:mm").format("x");
var monoFreq = $("#freq-input").val().trim();

var newMono = {
    name: monoName,
    dest: monoDest,
    first: firstMono,
    freq: monoFreq
  };

database.ref().push(newMono);
 
  console.log(newMono.name);
  console.log(newMono.dest);
  console.log(newMono.first);
  console.log(newMono.freq);

  alert("Monorail Added");

  $("#mono-input").val("");
  $("#dest-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

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

// First Time (pushed back 1 year to make sure it comes before current time)
var firstMonoConverted = moment(firstMono, "HH:mm").subtract(1, "years");
console.log(firstMonoConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm:"));

// Difference between the times
var diffTime = moment().diff(moment(firstMonoConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % monoFreq;
console.log(tRemainder);

// Minute Until Train
var minToMono = monoFreq - tRemainder;
console.log("MINUTES TILL TRAIN: " + minToMono);

// Next Train
var nextMono = moment().add(minToMono, "minutes");
console.log("ARRIVAL TIME: " + moment(nextMono).format("hh:mm"));

$("#mono-table > tbody").append("<tr><td>" + monoName + "</td><td>" + monoDest + "</td><td>" +
monoFreq + "</td><td>" + nextMono + "</td><td>" + minToMono + "</td><td>");

});
