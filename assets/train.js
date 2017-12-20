
//Making sure I'm hooked up to console
$(document).ready(function(){
    console.log("test");

   

    var config = {
        apiKey: "AIzaSyCdb3OuplGDTtrrIHTFrox5eAJtOCZs_jc",
        authDomain: "train-time-13f8c.firebaseapp.com",
        databaseURL: "https://train-time-13f8c.firebaseio.com",
        projectId: "train-time-13f8c",
        storageBucket: "",
        messagingSenderId: "621290675500"
      };
      firebase.initializeApp(config);

    // declare database var
    database = firebase.database();

    var name = "";
    var destination = "";
    var nextArrival = "";
    var frequency = "";

    $("#submitbtn").on('click', function(event){
        // This will prevent overwriting 
        event.preventDefault();

        // adding values dynamicly to the HTML elements using jQuery
    
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        nextArrival = $("#nextArrival").val().trim();
        frequency = $("#frequency").val().trim();

        console.log(frequency);

        // console.log(name);
        // console.log(role);
        // console.log(date);
        // console.log(rate);

        database.ref().push({
            name: name,
            destination: destination,
            nextArrival: nextArrival,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });


        database.ref().on('child_added', function(childSnapshot){
            //Log info coming out of snapshot
            // console.log(childSnapshot.val().name);
            // console.log(childSnapshot.val().role);
            // console.log(childSnapshot.val().date);
            // console.log(childSnapshot.val().rate);

              // Assumptions
        var tFrequency = childSnapshot.val().frequency;
    
        // Time is 3:30 AM
        var firstTime = childSnapshot.val().nextArrival;
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


            // This acts as a for loop, so for each 'childSnapshot', we're gonna add the info below in a new table row, or <td> 
            $("#table").append("<tr>" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>"  + "<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + moment(nextTrain).format("hh:mm")  + "</td>" + "<td>" +  tMinutesTillTrain + "</td>" + "</tr>");
        }, function(errorObject){
            console.log("Errors handled: " + errorObject.code);
        })
});