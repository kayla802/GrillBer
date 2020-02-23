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

    $("#rental-button").click(function () {
        /**@type {Rental} rental*/
        $.ajax(`${apiHostBase}/grill/${$("#new-rental-grill").val().toString()}`)
            .done(function (grill) {
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
                }).done(function () {
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
        })
    console.log(userId);

    //collect ratings and username

    $.ajax(`${apiHostBase}/rating?grillId=${grill.Id}`)
        .done(function (ratings) {
            console.log(ratings);
            var previousRatings = []
            let ratingUserId = []
            for (let rating of ratings) {
                previousRatings.push(rating);
                console.log(rating)

                ratingUserId.push(rating.UserId)
                console.log(ratingUserId)
            }
            renderRatings(previousRatings);
            //renderRatingUserName(ratingUserId);



        });;
        

    //Render the properties
    $("#grill-prop-div").append($(`<p>Available in ${grill.City} | 
        Cost: $${grill.Cost} per hour | Rating: ${grill.Rating} | Delivery Fee: ${grill.DeliveryFee} </p>`))

    populateUsersSelect();

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

//display ratings on grillpage
function renderRatings(ratings) {

    var ratingsDiv = $("#ratings-list");

    for (let rating of ratings) {

        var ratingsElem = $("<div>");
        ratingsElem.text(`Rating of ${rating.RatingScore} `);
        ratingsDiv.append(ratingsElem);
    };
}

// function renderRatingUserName(ratingusers) {

//     var ratingUserNameDiv = $("#ratings-user-name-list");
//     console.log(ratingusers)


//     for (let ratinguser of ratingusers) {

//         $.ajax(`${apiHostBase}/user/username=${ratinguser}`)
//             .done(function (ratinguser) {
//                 console.log(ratinguser)
//                 var ratingsUserNameElem = $("<div>");
//                 ratingsUserNameElem.text(`by ${ratinguser.UserName}`);
//                 ratingUserNameDiv.append(ratingsUserNameElem);
//             })
//     };
// }





