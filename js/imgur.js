var photoList = [];

$(document).ready(function() {
    function imgurPreload(photoList) {
        $('#imgur-cache').children('.imgur-cache-entry').remove();

        photoList.forEach(function(elem, index) {
            var entry = $.parseHTML('<img class="imgur-cache-entry" alt="cache">');
            entry[0].src = elem;

            $("#imgur-cache").append(entry[0]);
        });
    }

    function imgurPhotosLoader() {
        $.ajax({url: IMGUR_REQUEST_URL + IMGUR_ALBUM_HASH,
            dataType: 'json',
            headers: {
                'Authorization': 'Client-ID ' + IMGUR_CLIENT_ID
            },
            success: function(result) {
                photoList = [];

                result['data']['images'].forEach(function(elem, index) {
                    photoList.push(elem['link']);
                });

                imgurPreload(photoList);
            }
        });
    }

    imgurPhotosLoader();
    window.setInterval(imgurPhotosLoader, IMGUR_PRELOAD_INTERVAL);
});