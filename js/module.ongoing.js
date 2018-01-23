moduleOngoing = {};

$(document).ready(function() {
    let tableTemplate = [
        '<table class="module-ongoing-entry-results-table">',
        '    <thead>',
        '       <tr>',
        '           <th width="10%">#</th>',
        '           <th>Name</th>',
        '           <th width="25%">House</th>',
        '       </tr>',
        '    </thead>',
        '    <tbody class="results-first">',
        '    </tbody>',
        '    <tbody class="results-second">',
        '    </tbody>',
        '    <tbody class="results-third">',
        '    </tbody>',
        '</table>'
    ].join('\n');

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
        '       <div class="module-ongoing-entry-results-table-wrapper">',
                    tableTemplate,
        '       </div>',
        '   </div>',
        '</div>'
    ].join('\n');

    let resultEntryTemplate = [
        '<tr>',
        '   <td class="td-pos"></td>',
        '   <td class="td-name"></td>',
        '   <td class="td-house"></td>',
        '</tr>'
    ].join('\n');

    var stageList = [];
    var resultList = [];

    function formEventString (stage) {
        var eventString = '';

        eventString += '<small><b>Ongoing:</b></small> ';
        eventString += stage['event'];

        return eventString;
    }

    function appendStage(stage, index, listSize) {
        var entry = $.parseHTML(entryTemplate);

        $(entry).find(".module-ongoing-entry-title-text")[0].innerText = '[ Stage ' + (index + 1) + ' ]';
        $(entry).find(".module-ongoing-entry-name-text")[0].innerText = stage['name'];
        $(entry).find(".module-ongoing-entry-event-text")[0].innerHTML = formEventString(stage);

        $(entry).css("width", (100 / listSize).toString() + "%");
        $(entry).css("left", (index * (100 / listSize)).toString() + "%");

        $("#module-ongoing-wrapper").append(entry);
        renderResult($(entry).find(".module-ongoing-entry-results-table-wrapper")[0], stage['id']);
    }

    function updateStage(stage, index, listSize) {
        var entries = $("#module-ongoing-wrapper").children(".module-ongoing-entry-wrapper");

        $(entries[index]).find(".module-ongoing-entry-name-text")[0].innerText = stage['name'];
        $(entries[index]).find(".module-ongoing-entry-event-text")[0].innerHTML = formEventString(stage);

        renderResult($(entries[index]).find(".module-ongoing-entry-results-table-wrapper")[0], stage['id']);
    }

    function appendResult(resultTable, result, index, listSize) {
        var entry = $.parseHTML(resultEntryTemplate);

        var parentTBody = null;
        if (result['position'] == 1)
            parentTBody = $(resultTable).find(".results-first")[0];
        else if (result['position'] == 2)
            parentTBody = $(resultTable).find(".results-second")[0];
        else
            parentTBody = $(resultTable).find(".results-third")[0];
        
        $(entry).find(".td-pos")[0].innerText = result['position'];
        $(entry).find(".td-name")[0].innerText = result['name'];
        $(entry).find(".td-house")[0].innerText = result['team'];

        $(parentTBody).append(entry);
    }

    function renderResult(tableWrapper, stageID) {
        $.ajax({url: API_URL + "results/" + encodeURI(stageID), crossDomain: true, dataType: 'json', success: function(result) {
                resultEvent = result['event'];
                result = result['results'];

                if (resultList === result) {
                    return;
                } else {
                    changeFunc = appendResult;
                    $(tableWrapper).children("table").children("tbody").children("tr").remove();
                }

                // TODO: implement updateResult function

                $(tableWrapper).parent().find(".module-ongoing-entry-results-title-text")[0].innerText = resultEvent;
                result.forEach(function(elem, index) {
                    changeFunc($(tableWrapper).find("table")[0], elem, index, result.length);
                });

                resultList = result;
            }
        });
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
    moduleOngoing['renderInterval'] = 16000;
    moduleOverall['timerID'] = null;
});