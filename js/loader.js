var paneModules = [];

$(document).ready(function() {
    var currPaneModuleIndex = 0;

    paneModules.push(moduleOverall);
    paneModules.push(modulePhotos);
    // paneModules.push(moduleOngoing);
    
    function deactivateModule(container, module) {
        window.clearInterval(module['timerID']);
        var moduleHTML = $(module['domID']).detach();
        moduleHTML.attr("hidden", "");
        $("#hidden-modules").append(moduleHTML);
    }

    function activateModule(container, module) {
        var moduleHTML = $(module['domID']).detach();
        moduleHTML.removeAttr("hidden");
        $(container).append(moduleHTML);
        module['timerID'] = window.setInterval(module['renderFunc'], module['renderInterval']);
        module['renderFunc']();
    }

    activateModule("#panel-wrapper", moduleStandings);
    $("#panel-title-text").text(moduleStandings['name']);

    function cyclePaneModules() {
        $("#pane-wrapper").addClass("pane-wrapper-flip");
        $("#pane-wrapper").one("animationend", function() { $(this).removeClass("pane-wrapper-flip"); });

        deactivateModule("#pane-wrapper", paneModules[currPaneModuleIndex]);
        
        currPaneModuleIndex++;
        if (currPaneModuleIndex >= paneModules.length)
            currPaneModuleIndex = 0;

        activateModule("#pane-wrapper", paneModules[currPaneModuleIndex]);
        $("#pane-title-text").text(paneModules[currPaneModuleIndex]['name']);
    }

    cyclePaneModules();
    window.setInterval(cyclePaneModules, MODULE_SWITCH_INTERVAL);
});