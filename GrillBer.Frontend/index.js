let apiHostBase = `https://localhost:44329/api`;

$(function () {

    // Add click event to "Add New User" and check username for existing
    $("#new-user-btn").click(function () {

        // $("#myModal").modal();
        /**@type {User} user */
        let user = {
            Username: $("#new-user-username").val().toString(),
            FirstName: $("#new-user-first-name").val().toString(),
            LastName: $("#new-user-last-name").val().toString()
        }
        $.ajax(`${apiHostBase}/user/${user.Username}`).done(function (founduser) {
            if (founduser !== null) {
                alert("Please select another Username")
            }
            else {
                $.ajax({
                    url: `${apiHostBase}/user`,
                    method: "POST",
                    data: user
                }).done(function () {
                    refresh();
                    $("#new-user-username").val(""),
                        $("#new-user-first-name").val(""),
                        $("#new-user-last-name").val("")
                })
                    .fail(function (xhr, status, err) {
                        alert("Ajax Failed. Is the backend running? Err:" + status)
                    });
            }

        })
    });

    // Add click event to "Search" button
    $("#grill-search-btn").click(runGrillSearch);

    // Refresh the UI (for the first time)
    refresh();

});

function refresh() {
    // Get items for the filters
    $.ajax(`${apiHostBase}/grill`)
        .done(populateCityUi, populateCostUi, populateBrandUi, populateModelUi)
        .fail(function (xhr, status, err) {
            alert("Ajax Failed. Is the backend running? Err:" + status)
        });

    runGrillSearch();
}

function runGrillSearch() {
    let searchParams = {};
    if ($("#brand-select :selected").text() !== "null") {
        searchParams.Brand = $("#brand-select :selected").text();
    }
    if ($("#model-select :selected").text() !== "null") {
        searchParams.Model = $("#model-select :selected").text();
    }
    if ($("#city-select :selected").text() !== "null") {
        searchParams.City = $("#city-select :selected").text();
    }
    if ($("#cost-select :selected").text() !== "null") {
        searchParams.Cost = $("#cost-select :selected").text();
    }
    if ($("#rating-select :selected").val() !== "null") {
        searchParams.Rating = $("#rating-select :selected").val();
    }

    let searchParamsString = "";
    for (let searchParam in searchParams) {
        if (searchParamsString !== "") {
            searchParamsString += "&";
        }
        searchParamsString += searchParam + "=" + searchParams[searchParam];
    }
    clearSearchResultsAndSayLoading();

    $.ajax({

        url: `${apiHostBase}/grill?${searchParamsString}`,
        method: "GET"
    }).done(populateSearchResults)
        .fail(function (xhr, status, err) {
            alert("Ajax Failed. Is the backend running? Err;" + status)
        });

}

//Add single grill to the search results table

function addGrillToSearchResults(grill) {
    $.ajax(`${apiHostBase}/rating?grillId=${grill.Id}`)
        .done(function (rating) {
            let grillRating = []
            grillRating.push(rating);
            console.log(grillRating[0]);
            var score = 0;

            if (grillRating[0].length == 0) {
                score = "N/A";
            }
            else {
                score = rating[0].RatingScore;
            }

            console.log(score);
            let grillTableBody = $("#grill-list-table tbody");
            let grillRow = $("<tr>");

            grillRow.click(function () {
                window.location.href = "./grillpage.html?grillId=" + grill.Id;
            })
            grillRow.append($(`<td>${grill.City}</td>
            <td>${grill.Brand}</td>
            <td>${grill.Model}</td>
            <td>${grill.Cost}</td>
            <td>${score}</td>`));

            grillRow.addClass("mt-1");
            grillTableBody.append(grillRow);
        });
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
        addGrillToSearchResults(grill);
    }
    if ($.trim(grills) == '') {
        let grillMainBody = $("#main-body");
        grillMainBody.append($("<h4>No Results</h4>"));
    }
}

//Loads the City select in the search filter list
function populateCityUi(grills) {
    let citySelect = $('#city-select');
    citySelect.children(`:not([value="null"])`).remove();

    for (let grill of grills) {
        let newCityOption = $('<option>');
        newCityOption.val(grill.Id);
        newCityOption.text(`${grill.City}`);
        citySelect.append(newCityOption);
    }
}

//Loads the cost select in the search filter list
function populateCostUi(grills) {
    let costSelect = $('#cost-select');
    costSelect.children(`:not([value="null"])`).remove();

    for (let grill of grills) {
        let newCostOption = $('<option>');
        newCostOption.val(grill.Id);
        newCostOption.text(`${grill.Cost}`);
        costSelect.append(newCostOption);
    }
}


//Loads the Brand in the search filter list
function populateBrandUi(grills) {
    let brandSelect = $('#brand-select');
    brandSelect.children(`:not([value="null"])`).remove();

    for (let grill of grills) {
        let newBrandOption = $('<option>');
        newBrandOption.val(grill.Id);
        newBrandOption.text(`${grill.Brand}`);
        brandSelect.append(newBrandOption);
    }
}


//Loads the Model in the search filter list
function populateModelUi(grills) {
    let modelSelect = $('#model-select');
    modelSelect.children(`:not([value="null"])`).remove();

    for (let grill of grills) {
        let newModelOption = $('<option>');
        newModelOption.val(grill.Id);
        newModelOption.text(`${grill.Model}`);
        modelSelect.append(newModelOption);
    }
}



