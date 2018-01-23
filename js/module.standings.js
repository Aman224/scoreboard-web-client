var moduleStandings = {};

$("document").ready(function() {
    let entryTemplate = [
        '<div class="module-standings-entry-wrapper">',
        '   <div class="module-standings-entry-logo-wrapper">',
        '       <img class="module-standings-entry-logo-img" src="img/img.png" alt="team logo" width="100%" height="100%">',
        '   </div>',
        '   <div class="module-standings-entry-name-wrapper">',
        '       <span class="module-standings-entry-name-text"></span>',
        '   </div>',
        '   <div class="module-standings-entry-score-wrapper">',
        '       <span class="module-standings-entry-score-text"></span>',
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

        $(entry).find(".module-standings-entry-score-text")[0].innerText = score['score'];
        $(entry).find(".module-standings-entry-name-text")[0].innerText = score['name'];
        $(entry).find(".module-standings-entry-logo-img")[0].src = "img/" + score['logo'];

        $(entry).css("height", (100 / listSize).toString() + "%");
        $(entry).css("top", (index * (100 / listSize)).toString() + "%");

        $(entry).css("background-color", rgba_convert(score['color'], 0.5));

        $("#module-standings-wrapper").append(entry);
    }

    function updateScore(score, index, listSize) {
        var entries = $("#module-standings-wrapper").children(".module-standings-entry-wrapper");

        $(entries[index]).removeClass("module-standings-enter");
        $(entries[index]).css("animation-delay", (index * 0.18).toString() + "s");
        $(entries[index]).addClass("module-standings-exit");

        $(entries[index]).one("animationend", function() {
            $(entries[index]).css("animation-delay", (listSize * 0.18).toString() + "s");
            $(entries[index]).addClass("module-standings-enter");
            $(entries[index]).removeClass("module-standings-exit");
        });

        $(entries[index]).find(".module-standings-entry-name-text")[0].innerText = score['name'];
        $(entries[index]).find(".module-standings-entry-score-text")[0].innerText = score['score'];
        $(entries[index]).find(".module-standings-entry-logo-img")[0].src = "img/" + score['logo'];

        $(entries[index]).css("background-color", rgba_convert(score['color'], 0.5));
    }

    function renderScores() {
        $.ajax({url: API_URL + "scores", crossDomain: true, dataType: 'json', success: function(result) {
                if (scoreList === result) {
                    return;
                } else if (scoreList.length !== result.length) {
                    changeFunc = appendScore;
                    $(".module-standings-entry-wrapper").remove();
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

    moduleStandings['name'] = "Standings";
    moduleStandings['domID'] = "#module-standings-wrapper";
    moduleStandings['renderFunc'] = renderScores;
    moduleStandings['renderInterval'] = 12000;
    moduleStandings['timerID'] = null;
});