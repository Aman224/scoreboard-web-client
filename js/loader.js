$(document).ready(function() {
    next_module = $("#module-standings-wrapper").detach();

    $("#panel-title-text").text("Standings");
    $("#panel-wrapper").append(next_module);
});