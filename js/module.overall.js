var moduleOverall = {};

$("document").ready(function() {
    let entryTemplate = [
        '<div class="module-overall-entry-wrapper">',
        '   <div class="module-overall-entry-logo-wrapper">',
        '       <img class="module-overall-entry-logo-img" src="img/img.png" alt="team logo" width="100%" height="100%">',
        '   </div>',
        '   <div class="module-overall-entry-name-wrapper">',
        '       <span class="module-overall-entry-name-text"></span>',
        '   </div>',
        '   <div class="module-overall-entry-score-wrapper">',
        '       <span class="module-overall-entry-score-text"></span>',
        '   </div>',
        '</div>'
    ].join('\n');
    
    var scoreList = [];

    function rgba_convert(rgb, a) {
        var colorString = "rgba(";

        colorString += parseInt(rgb.slice(0, 2), 16) + ", ";
        colorString += parseInt(rgb.slice(2, 4), 16) + ", ";
        colorString += parseInt(rgb.slice(4, 6), 16) + ", ";
        colorString += a + ")";
        
        return colorString;
    }

    function appendScore(score, index, listSize) {
        var entry = $.parseHTML(entryTemplate);

        $(entry).find(".module-overall-entry-score-text")[0].innerText = parseInt(score['score']) + parseInt(score['other_score']);
        $(entry).find(".module-overall-entry-name-text")[0].innerText = score['name'];
        $(entry).find(".module-overall-entry-logo-img")[0].src = "img/" + score['logo'];

        $(entry).css("width", (100 / listSize).toString() + "%");
        $(entry).css("left", (index * (100 / listSize)).toString() + "%");

        $(entry).css("background-color", rgba_convert(score['color'], 0.5));

        $("#module-overall-wrapper").append(entry);
    }

    function updateScore(score, index, listSize) {
        var entries = $("#module-overall-wrapper").children(".module-overall-entry-wrapper");

        $(entries[index]).find(".module-overall-entry-name-text")[0].innerText = score['name'];
        $(entries[index]).find(".module-overall-entry-score-text")[0].innerText = parseInt(score['score']) + parseInt(score['other_score']);
        $(entries[index]).find(".module-overall-entry-logo-img")[0].src = "img/" + score['logo'];

        $(entries[index]).css("background-color", rgba_convert(score['color'], 0.5));
    }

    function renderScores() {
        $.ajax({url: API_URL + "scores", crossDomain: true, dataType: 'json', success: function(result) {
                if (scoreList === result) {
                    return;
                } else if (scoreList.length !== result.length) {
                    changeFunc = appendScore;
                    $(".module-overall-entry-wrapper").remove();
                } else {
                    changeFunc = updateScore;
                }

                result.forEach(function(elem, index) {
                    changeFunc(elem, index, result.length);
                });

                scoreList = result;
            }
        });
    }

    moduleOverall['name'] = "Overall";
    moduleOverall['domID'] = "#module-overall-wrapper";
    moduleOverall['renderFunc'] = renderScores;
    moduleOverall['timerID'] = null;
});