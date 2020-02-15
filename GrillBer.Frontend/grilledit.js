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
    grillRow.click(function () {
        window.location.href = "./grillpage.html?grillId=" + grill.Id;
    })
    grillRow.append($(`<td>${grill.City}</td>
    <td>${grill.Brand}</td>
    <td>${grill.Model}</td>
    <td>${grill.Cost}</td>
    <td>${grill.DeliveryFee}</td>
    <td>${grill.Rating}</td>`));

    grillRow.addClass("mt-1");
    grillTableBody.append(grillRow);
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