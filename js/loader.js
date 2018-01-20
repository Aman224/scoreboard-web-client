$(document).ready(function() {
    next_module = $("#module-standings-wrapper").detach();
    next_module.removeAttr("hidden")

    $("#panel-title-text").text("Standings");
    $("#panel-wrapper").append(next_module);

    next_module = $("#module-overall-wrapper").detach();
    next_module.removeAttr("hidden")

    $("#pane-title-text").text("Overall");
    $("#pane-wrapper").append(next_module);
});