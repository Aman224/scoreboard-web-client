let entryTemplate = [
    '<div class="module-standings-entry-wrapper">',
    '   <div class="module-standings-entry-logo-wrapper">',
    '   </div>',
    '   <div class="module-standings-entry-name-wrapper">',
    '       <span class="module-standings-entry-name-text"></span>',
    '   </div>',
    '   <div class="module-standings-entry-score-wrapper">',
    '       <span class="module-standings-entry-score-text"></span>',
    '   </div>',
    '</div>'
].join('\n');

$("document").ready(function() {
    var scoreList = [];

    function appendScore(score, index, listSize) {
        var entry = $.parseHTML(entryTemplate);

        $(entry).find(".module-standings-entry-score-text")[0].innerText = score['score'];
        $(entry).find(".module-standings-entry-name-text")[0].innerText = score['name'];

        $(entry).css("height", (100 / listSize).toString() + "%");
        $(entry).css("top", (index * (100 / listSize)).toString() + "%");

        $("#module-standings-wrapper").prepend(entry);
    }

    function updateScore(score, index, listSize) {
        var entries = $("#module-standings-wrapper").children(".module-standings-entry-wrapper");

        $(entries[index]).find(".module-standings-entry-name-text")[0].innerText = score['name'];
        $(entries[index]).find(".module-standings-entry-score-text")[0].innerText = score['score'];
    }

    function renderScores() {
        $.ajax({url: API_URL + "scores", crossDomain: true, dataType: 'json', success: function(result) {
                if (scoreList.length !== result.length) {
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

    renderScores();
    window.setInterval(renderScores, 2000);
});