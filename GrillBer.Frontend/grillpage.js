let apiHostBase = `https://localhost:44329/api`;
let grillId

$(function () {
    var urlParams = new URLSearchParams(window.location.search);
    grillId = urlParams.get("grillId");
    $.ajax(`${apiHostBase}/grill/${grillId}`)
    .done(renderGrillPage)
    .fail(function (xhr, status, err) {
        alert("Ajax Failed. Is the backend running? Err" + status)
    });;


//Add click event to "Make a Rental"

    $("#rental-button").click(function(){
        /**@type {Rental} rental*/
        $.ajax(`${apiHostBase}/grill/${$("#new-rental-grill").val().toString()}`)
            .done(function (grill){
        let rental = {
            User: $("#new-rental-username").val().toString(),
            Grill: grill.Id,
            Start: DateTime.Now,
            //Start: $("#new-rental-start").val().toDateString(),
            End: $("#new-rental-end").val().toDateString()
        }
      
        $.ajax({
            url: `${apiHostBase}/rental`,
            method: "POST",
            data: rental
        }).done(function(){
            refresh();
            $("#new-rental-username").val(""),
            $("#new-rental-grill").val(""),
            $("#new-rental-start").val(""),
            $("#new-rental-end").val("")
        })       
            .fail(function (xhr, status, err) {
                alert("Ajax Failed. Is the backend running? Err:" + status)
            });
    })
})
});

function renderGrillPage(grill) {

    //collect grill name
    $("#model-name-header").text(grill.Brand + " " + grill.Model);

    //Render the owner

    let ownerString = "Owned by";
    let userId = grill.OwnerId
        $.ajax(`${apiHostBase}/user/${userId}`)
        .done(function (user) {
            ownerString += " " + user.FirstName + " " + user.LastName;
            $("#grill-owner-header").text(ownerString);
        })
        .fail(function (xhr, status, err) {
            alert("Ajax Failed. Is the backend running. Err:" + status)
        });;
        $(document).ready(function() {
            $('#rateMe3').mdbRate();
          });

    //Render the properties
    $("#grill-prop-div").append($(`<p>Available in ${grill.City} | 
        Cost: $${grill.Cost} per hour | Rating: ${grill.Rating} | Delivery Fee: ${grill.DeliveryFee} </p>`))

    populateUsersSelect();
    populateRatingsList();

    
    
}



function populateUsersSelect(users) {
    $.ajax(`${apiHostBase}/User`)
    .done(function (users) {
        $("#user-select").children().remove();
        for (let user of users) {
            $("#user-select").append(`<option value=${user.Id}>${user.Username}</option>`);
        }
    })
    .fail(function (xhr, status, err) {
        alert("Ajax Failed. Is the backend running? Err:" + status)
    });
}


// tried to copy the grill results table
// function addSingleRatingToRatingList(rating) {
//     let ratinglist = $("#rating-list-table");
//     let ratingRow = $("<tr>");
    
//     ratingRow.append($(`<td>${rating.Id}</td>
//     <td>${rating.UserId}</td>
//     <td>${rating.RatingScore}</td>
//     <td>${rating.GrillId}</td>
//     <td>${rating.RentalId}</td>`));

//     ratingRow.addClass("mt-1");
//     ratingList.append(ratingRow);
// }

//create a rating list for grill page
function populateRatingsList(grill){
    
    let grill = rating.grillId
    $.ajax(`${apiHostBase}/Rating`)
    .done(function(ratings){
        
        for(let rating of ratings){
            $("#ratings-list").append(`<li>${rating.RatingScore}</li>`);
        }
    })
    .fail(function (xhr, status, err) {
        alert("Ajax Failed. Is the backend running? Err:" + status)
    });
}


