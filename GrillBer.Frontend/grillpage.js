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
    for (let userId of grill.OwnerId) {
        $.ajax(`${apiHostBase}/user/${userId}`)
        .done(function (user) {
            ownerString += " " + user.FirstName + " " + user.Lastname;
            $("#grill-owner-header").text(ownerString);
        })
        .fail(function (xhr, status, err) {
            alert("Ajax Failed. Is the backend running. Err:" + status)
        });;
    }

    //Render the properties
    //Delivery Fee: ${grill.DeliveryFee} --- to be added below 
    $("#grill-prop-div").append($(`<p>Available in: ${grill.City} | 
        Cost: $${grill.Cost} per hour | Rating: ${grill.Rating} </p>`))

    populateUsersSelect();
}

function populateUsersSelect(users) {
    let userSelect = $('#user-select');
    userSelect.children(`:not([value="null"])`).remove();
    
    for (let user of users) {
        let newUserOption = $('<option>');
        newUserOption.val(user.Id);
        newUserOption.text(`${user.Username}`);
        userSelect.append(newUserOption);
    }
}
