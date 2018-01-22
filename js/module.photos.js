var modulePhotos = {};

$("document").ready(function() {
    var currPhoto = 0;

    function renderPhotos() {
        if (photoList.length === 0)
            return;

        document.getElementById("module-photos-img").src = photoList[currPhoto];

        currPhoto++;
        if (currPhoto >= photoList.length)
            currPhoto = 0;
    }

    modulePhotos['name'] = "Gallery";
    modulePhotos['domID'] = "#module-photos-wrapper";
    modulePhotos['renderFunc'] = renderPhotos;
    modulePhotos['timerID'] = null;
});