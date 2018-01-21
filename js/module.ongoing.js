moduleOngoing = {};

$(document).ready(function() {
    let entryTemplate = [
        '<div class="module-ongoing-entry-wrapper">',
        '   <div class="module-ongoing-entry-title-wrapper">',
        '       <span class="module-ongoing-entry-title-text"></span>',
        '   </div>',
        '   <div class="module-ongoing-entry-name-wrapper">',
        '       <span class="module-ongoing-entry-name-text"></span>',
        '   </div>',
        '   <div class="module-ongoing-entry-event-wrapper">',
        '       <span class="module-ongoing-entry-event-text"></span>',
        '   </div>',
        '   <div class="module-ongoing-entry-results-wrapper">',
        '       <div class="module-ongoing-entry-results-title-wrapper">',
        '           <span class="module-ongoing-entry-results-title-text"></span>',
        '       </div>',
        '   </div>',
        '</div>'
    ].join('\n');

    var stageList = [];

    function formEventString (stage) {
        var eventString = '';

        eventString += '<small><b>Ongoing</b></small>: ';
        eventString += stage['event'];

        return eventString;
    }

    function appendStage(stage, index, listSize) {
        var entry = $.parseHTML(entryTemplate);

        $(entry).find(".module-ongoing-entry-title-text")[0].innerText = '[ Stage ' + (index + 1) + ' ]';
        $(entry).find(".module-ongoing-entry-name-text")[0].innerText = stage['name'];
        $(entry).find(".module-ongoing-entry-event-text")[0].innerHTML = formEventString(stage);
        // $(entry).find(".module-ongoing-entry-results-title-text")[0].innerHTML = 'Results, ' + 'Some event';

        $(entry).css("width", (100 / listSize).toString() + "%");
        $(entry).css("left", (index * (100 / listSize)).toString() + "%");

        $("#module-ongoing-wrapper").append(entry);
    }

    function updateStage(stage, index, listSize) {
        var entries = $("#module-ongoing-wrapper").children(".module-ongoing-entry-wrapper");

        $(entries[index]).find(".module-ongoing-entry-name-text")[0].innerText = stage['name'];
    }

    function renderStage() {
        $.ajax({url: API_URL + "stages", crossDomain: true, dataType: 'json', success: function(result) {
                if (stageList === result) {
                    return;
                } else if (stageList.length !== result.length) {
                    changeFunc = appendStage;
                    $(".module-ongoing-entry-wrapper").remove();
                } else {
                    changeFunc = updateStage;
                }

                result.forEach(function(elem, index) {
                    changeFunc(elem, index, result.length);
                });

                stageList = result;
            }
        });
    }

    moduleOngoing['name'] = 'Ongoing';
    moduleOngoing['domID'] = '#module-ongoing-wrapper';
    moduleOngoing['renderFunc'] = renderStage;
    moduleOverall['timerID'] = null;
});