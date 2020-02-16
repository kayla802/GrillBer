let apiHostBase = `https://localhost:44329/api`;


$(function () {
    populateUsersSelect();
    // Add click event to Find my Grills button
    $("#find-button").click(runGrillSearch);

})

function runGrillSearch () {
    $.ajax(`${apiHostBase}/user/${$("#user-select :selected").text()}`)
    .done(function (user) {
    clearSearchResultsAndSayLoading();
    $.ajax({
        url: `${apiHostBase}/grill?OwnerId=${user.Id}`,
        method: "GET"
    }).done(populateSearchResults)
        .fail(function (xhr, status, err) {
            alert("Ajax Failed. Is the backend running? Err;" + status)
        });
    })
}

// Add single grill to the search results table

function addGrillToSeachResults(grill) {
    let grillTableBody = $("#grill-list-table tbody");
    let grillRow = $("<tr>");
    grillRow.append($(`<h5>
    The ${grill.Brand} ${grill.Model}
    located in ${grill.City}
    <br/>
    Cost per Hour: ${grill.Cost} | 
    Delivery Fee: ${grill.DeliveryFee} | 
    Rating: ${grill.Rating}
    <br/>
    <button id ="edit-${grill.Id}-button">Edit this Grill</button>
    <button id ="delete-${grill.Id}-button">Delete this Grill</button>    
    </h5>`));

    grillTableBody.append(grillRow);

    // $("#delete-${grill.Id}-button").click(function() {
    //     $.ajax({
    //        url: `${apiHostBase}/grill/${grill.Id}`,
    //        method: "Delete"
    //    }).done(function() {
    //        alert("Successfully Deleted")})        
    //    .fail(function (xhr, status, err) {
    //        alert("Ajax Failed. Is the backend running? Err:" + status)
    //    });    
}

//Clears search results and says loading. Should be used be ajax request to populate with search
function clearSearchResultsAndSayLoading() {
    let grillTable = $("#grill-list-table");
    grillTable.find("tbody").children().remove();
    let grillMainBody = $("#main-body");
    grillMainBody.find("h4").remove();
    $("grill-list-div").append($(`<div id="loadingDiv">Loading...</div>`));
}

//removes the loading bar and loads in all grills
function populateSearchResults(grills) {
    $("loadingDiv").remove();
    for (let grill of grills) {
        addGrillToSeachResults(grill);
    }
    if ($.trim(grills) == '') {
        let grillMainBody = $("#main-body");
        grillMainBody.append($("<h4>No Results</h4>"));
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
