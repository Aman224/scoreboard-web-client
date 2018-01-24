var modulePhotos = {};

$("document").ready(function() {
    var imgElement = document.getElementById("module-photos-img");
    var currPhoto = 0;

    imgElement.addEventListener("animationend", function(event) {
        imgElement.classList.remove("module-photos-enter");
        imgElement.classList.remove("module-photos-exit");

        event.target.src = photoList[currPhoto];

        if (event.animationName === "photo-flip")
            imgElement.classList.add("module-photos-enter");
    });

    imgElement.addEventListener("animationstart", function(event) {

        parentElement = document.getElementById("module-photos-wrapper");
        event.target.removeAttribute('width');
        event.target.removeAttribute('height');

        if ((event.target.naturalWidth / event.target.naturalHeight) > (parentElement.clientWidth / parentElement.clientHeight))
            event.target.setAttribute('width', '100%');
        else
            event.target.setAttribute('height', '100%');
    });

    function renderPhotos() {
        if (photoList.length === 0)
            return;
        
        imgElement.classList.add("module-photos-exit");

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