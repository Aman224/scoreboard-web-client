$(document).ready(function() {
    function setClockTime() {
        var d = new Date();
        var time = new Intl.DateTimeFormat('en-IN', {
            'hour': '2-digit', minute: '2-digit', 'hour12': false
        }).format(d);

        $("#clock-text").text(time);
    }

    setClockTime();
    window.setInterval(setClockTime, 30000);

    $("#footer-text").text("Govt. Model Engineering College, Thrikkakara");
    $("#title-text").html("Layatharang <b>2018</b>");
});