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
            $("#user-select").append(`<option value=${user.Id}>${user.FirstName} ${user.LastName}</option>`);
        }
    })
    .fail(function (xhr, status, err) {
        alert("Ajax Failed. Is the backend running? Err:" + status)
    });
}
