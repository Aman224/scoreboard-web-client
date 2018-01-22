var paneModules = [];

$(document).ready(function() {
    var currPaneModuleIndex = 0;

    paneModules.push(moduleOverall);
    paneModules.push(moduleOngoing);
    
    function deactivateModule(container, module) {
        window.clearInterval(module['timerID']);
        var moduleHTML = $(module['domID']).detach();
        moduleHTML.attr("hidden", "");
        $("#hidden-modules").append(moduleHTML);
    }

    function activateModule(container, module, updateInterval) {
        var moduleHTML = $(module['domID']).detach();
        moduleHTML.removeAttr("hidden");
        $(container).append(moduleHTML);
        module['timerID'] = window.setInterval(module['renderFunc'], updateInterval)
        module['renderFunc']();
    }

    activateModule("#panel-wrapper", moduleStandings, API_REFRESH_INTERVAL);
    $("#panel-title-text").text("Standings");

    function cyclePaneModules() {
        deactivateModule("#pane-wrapper", paneModules[currPaneModuleIndex]);
        
        currPaneModuleIndex++;
        if (currPaneModuleIndex === paneModules.length)
            currPaneModuleIndex = 0;

        activateModule("#pane-wrapper", paneModules[currPaneModuleIndex], API_REFRESH_INTERVAL);
        $("#pane-title-text").text(paneModules[currPaneModuleIndex]['name']);
    }

    cyclePaneModules();
    window.setInterval(cyclePaneModules, MODULE_SWITCH_INTERVAL);
});