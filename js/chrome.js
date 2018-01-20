$(document).ready(function() {
    function setClockTime() {
        var d = new Date();
        var time = new Intl.DateTimeFormat('en-IN', {
            'hour': '2-digit', minute: '2-digit', 'hour12': false
        }).format(d);

        $("#clock-text").text(time);
    }

    window.setInterval(setClockTime, 30000);
    setClockTime();

    $("#footer-text").text("Govt. Model Engineering College, Thrikkakara");
    $("#title-text").text("Layatharang 2017");
});