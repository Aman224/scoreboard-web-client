var modulePhotos = {};

$("document").ready(function() {
    var currPhoto = 0;

    function renderPhotos() {
        if (photoList.length === 0)
            return;
        
        var imgElement = document.getElementById("module-photos-img");
        
        imgElement.classList.remove("module-photos-enter");
        imgElement.classList.add("module-photos-exit");

        imgElement.addEventListener("animationend", function(event) {
            imgElement.classList.remove("module-photos-exit");

            event.target.removeEventListener("animationend");
        });

        imgElement.classList.add("module-photos-enter");
        
        imgElement.addEventListener("animationstart", function(event) {
            event.target.src = photoList[currPhoto];

            parentElement = document.getElementById("module-photos-wrapper");
            event.target.removeAttribute('width');
            event.target.removeAttribute('height');

            if ((event.target.naturalWidth / event.target.naturalHeight) > (parentElement.clientWidth / parentElement.clientHeight))
                event.target.setAttribute('width', '100%');
            else
                event.target.setAttribute('height', '100%');

            event.target.removeEventListener("animationstart");
        });

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