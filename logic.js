// Initialize Firebase
var config = {
    apiKey: "AIzaSyBfz7_udoeOr0wCMpTBeb2MP6R_lWWrtyk",
    authDomain: "train-scheduler-bf944.firebaseapp.com",
    databaseURL: "https://train-scheduler-bf944.firebaseio.com",
    projectId: "train-scheduler-bf944",
    storageBucket: "train-scheduler-bf944.appspot.com",
    messagingSenderId: "95011018977"
};
firebase.initializeApp(config);

var database = firebase.database();

// var monthsWorked = 0;
// var totalBilled = 0;

var rowNumber = 0;

var input;

//creating on click function
$("#submit").on("click", function () {

    var trainName = $("#name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainTime = $("#time").val().trim();
    var trainFreq = $("#freq").val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFreq);

    //saving the new train to firebase
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        beginTime: trainTime,
        frequency: trainFreq
    });


});

database.ref().on("child_added", function (snapshot) {

    var tableRow = $("<tr>");
    tableRow.attr("id", "row-" + rowNumber);
    $("#main").append(tableRow);


    input = [snapshot.val().name, snapshot.val().destination, snapshot.val().beginTime, snapshot.val().frequency];

    for (var i = 0; i < input.length; i++) {
        var tableData = $("<td>");
        tableData.text(input[i]);
        $("#row-" + rowNumber).append(tableData);
    }

    rowNumber++;

});

//calculate minutes away using moment.js
