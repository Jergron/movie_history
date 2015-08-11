define(["jquery"], function($){
  $(document).ready(function() {
    $("button").click(function(e) {
      e.preventDefault();
    var userInput = $("#userInput").val();
    var userRating = $("#userRating").val();
    console.log(userInput, userRating);
      $.ajax({
        url: "http://www.omdbapi.com/?t=" + userInput,
      }).done(function(data){
        var watched;
        if($("#watch").is(":checked")) {
          watched = true;
        }
        if($("#notWatch").is(":checked")) {
          watched = false;
        } 
        var movieObj = {
          "title": data.Title,
          "year": data.Year,
          "actors": data.Actors,
          "rating": userRating,
          "watched": watched
        };

        if ($("#watch").prop("checked") === false && $("#notWatch").prop("checked") === false) {
          alert("Help");
        }
        else if(userRating > 10){
           alert("Please enter a number from 1 - 10");
        }
        else {
          $.ajax({
            url: "https://moviehistory.firebaseio.com/movies.json",
            method: "POST",
            data: JSON.stringify(movieObj)
          }).done(function(){
              location.reload();
            });
        }
      });
    });
  });
});

