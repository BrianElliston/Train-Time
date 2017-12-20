
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
    var minutesAway = "";

    $("#submitbtn").on('click', function(event){
        // This will prevent overwriting 
        event.preventDefault();

        // adding values dynamicly to the HTML elements using jQuery
    
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        nextArrival = $("#nextArrival").val().trim();
        minutesAway = $("#minutesAway").val().trim();

        // console.log(name);
        // console.log(role);
        // console.log(date);
        // console.log(rate);

        database.ref().push({
            name: name,
            destination: destination,
            nextArrival: nextArrival,
            minutesAway: minutesAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });


        database.ref().on('child_added', function(childSnapshot){
            //Log info coming out of snapshot
            // console.log(childSnapshot.val().name);
            // console.log(childSnapshot.val().role);
            // console.log(childSnapshot.val().date);
            // console.log(childSnapshot.val().rate);

            // this was all gotten from the moment js website
            var a = moment(); // this stores the current time in a variable
            var b = moment(childSnapshot.val().date); // this stores the date from childSnapshot to a variable
            var months = a.diff(b, 'months'); // subtracts childSnapshot from a, and calculates it in months. 
            console.log(months);


            // This acts as a for loop, so for each 'childSnapshot', we're gonna add the info below in a new table row, or <td> 
            $("#table").append("<tr>" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().nextArrival + "<td>" + childSnapshot.val().minutesAway + "</td>" + "</tr>");
        }, function(errorObject){
            console.log("Errors handled: " + errorObject.code);
        })
});