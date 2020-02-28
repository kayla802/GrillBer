let apiHostBase = `https://localhost:44329/api`;


$(function () {
    populateUsersSelect();
    // Add click event to Find my Grills button
    $("#find-button").click(runRentalSearch);
})

function runRentalSearch() {
    $.ajax(`${apiHostBase}/user/${$("#user-select :selected").text()}`)
        .done(function (user) {
            clearSearchResultsAndSayLoading();
            $.ajax({
                url: `${apiHostBase}/rental?User=${user.Id}`,
                method: "GET"
            }).done(populateSearchResults)
                .fail(function (xhr, status, err) {
                    alert("Ajax Failed. Is the backend running? Err;" + status)
                });
        })
}

// Add single grill to the search results table

function addRentalToSeachResults(rental) {
    $.ajax(`${apiHostBase}/grill/${rental.Grill}`)
        .done(function (grill) {
            let rentalTableBody = $("#rental-list-table tbody");
            let rentalRow = $("<tr>");
            rentalRow.append($(`<h5>
    The ${grill.Brand} ${grill.Model}
    located in ${grill.City}
    <br/>
    <button id ="rate-${grill.Id}-button">Rate this Grill</button>   
    </h5>`));
            rentalTableBody.append(rentalRow);
            addButtonFunctionality(grill, rental);
        })
}

//Clears search results and says loading. Should be used be ajax request to populate with search
function clearSearchResultsAndSayLoading() {
    let rentalTable = $("#rental-list-table");
    rentalTable.find("tbody").children().remove();
    let rentalMainBody = $("#main-body");
    rentalMainBody.find("h4").remove();
    $("rental-list-div").append($(`<div id="loadingDiv">Loading...</div>`));
}

//removes the loading bar and loads in all grills
function populateSearchResults(rentals) {
    $("loadingDiv").remove();
    for (let rental of rentals) {
        addRentalToSeachResults(rental);
    }
    if ($.trim(rentals) == '') {
        let rentalMainBody = $("#main-body");
        rentalMainBody.append($("<h4>No Results</h4>"));
    }
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


function addButtonFunctionality(grill, rental) {
    //button functionality and add edit fields to page
    $(`#rate-${grill.Id}-button`).click(function () {
        let rentalTable = $("#rental-list-table");
        rentalTable.find("tbody").children().remove();
        let rentalTableBody = $("#rental-list-table tbody");
        let rentalRow = $("<tr>");
        rentalRow.append($(`<h4>
        The ${grill.Brand} ${grill.Model}
        located in ${grill.City}
        <br/>
        My Rating: <select id="rating-select">
        <option value="null"></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        <button id ="add-${grill.Id}-rating">Rate this Grill</button>
        </h4>`));
        rentalTableBody.append(rentalRow);
        // create new button and add functionality to that button
        $(`#add-${grill.Id}-rating`).click(function () {
            rating = {
                UserId: rental.User,
                RatingScore: $("#rating-select").val().toString(),
                GrillId: grill.Id,
                RentalId: rental.Id
            }
            // add ajax
            $.ajax({
                url: `${apiHostBase}/rating`,
                method: "POST",
                data: rating
            }).done(function () {
                //reload page with new results
                updateRatingTotal(grill);
                runRentalSearch();
            }).fail(function (xhr, status, err) {
                alert("Ajax Failed. Is the backend running? Err:" + status)

            })
        })
    })
}


function updateRatingTotal(grill) {
    $.ajax(`${apiHostBase}/rating?Grill=${grill.Id}`)
        .done(function (ratings) {
            var ratingCount = ratings.length;
            var ratingsTotal = 0
            for (let rating of ratings) {
                ratingsTotal += rating.RatingScore;
            }
            let newGrillInfo = {
                Id: grill.Id,
                Rating: (ratingsTotal / ratingCount).toFixed()   
            }
            $.ajax({
                url: `${apiHostBase}/grill/${grill.Id}`,
                method: "PUT",
                data: newGrillInfo
            })
        })
}