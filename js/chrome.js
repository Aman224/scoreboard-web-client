$(document).ready(function() {
    function setClockTime() {
        var d = new Date();
        var time = new Intl.DateTimeFormat('en-IN', {
            'hour': '2-digit', minute: '2-digit', 'hour12': false
        }).format(d);

        $("#clock-text").text(time);
    }

    setClockTime();
    window.setInterval(setClockTime, CLOCK_UPDATE_INTERVAL);

    $("#footer-text").html(FOOTER_HTML);
    $("#title-text").html(TITLE_HTML);
});
