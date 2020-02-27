let apiHostBase = `https://localhost:44329/api`;

// Add click event to "Add New Grill"
$("#new-grill-btn").click(function () {
    /**@type {Grill} grill */
    $.ajax(`${apiHostBase}/user/${$("#new-grill-owner").val().toString()}`)
        .done(function (user) {

            let grill = {
                OwnerId: user.Id,
                Brand: $("#new-grill-brand").val().toString(),
                Model: $("#new-grill-model").val().toString(),
                City: $("#new-grill-city").val().toString(),
                Cost: $("#new-grill-cost").val().toString(),
                DeliveryFee: $("#new-grill-delivery").val().toString()
            }
            $.ajax({
                url: `${apiHostBase}/grill`,
                method: "POST",
                data: grill
            }).done(function () {
                refresh();
                $("#new-grill-owner").val(""),
                    $("#new-grill-brand").val(""),
                    $("#new-grill-model").val(""),
                    $("#new-grill-city").val(""),
                    $("#new-grill-cost").val(""),
                    $("#new-grill-delivery").val("")

            })
                .fail(function (xhr, status, err) {
                    alert("Ajax Failed. Is the backend running? Err:" + status)
                });

        })



});