var modulePhotos = {};

$("document").ready(function() {
    var currPhoto = 0;

    function renderPhotos() {
        if (photoList.length === 0)
            return;

        imgElement = document.getElementById("module-photos-img");
        imgElement.src = photoList[currPhoto];

        parentElement = document.getElementById("module-photos-wrapper");
        imgElement.removeAttribute('width');
        imgElement.removeAttribute('height');

        if ((imgElement.naturalWidth / imgElement.naturalHeight) > (parentElement.clientWidth / parentElement.clientHeight))
            imgElement.setAttribute('width', '100%');
        else
            imgElement.setAttribute('height', '100%');

        currPhoto++;
        if (currPhoto >= photoList.length)
            currPhoto = 0;
    }

    modulePhotos['name'] = "Gallery";
    modulePhotos['domID'] = "#module-photos-wrapper";
    modulePhotos['renderFunc'] = renderPhotos;
    modulePhotos['renderInterval'] = 6000;
    modulePhotos['timerID'] = null;
});