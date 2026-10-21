// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    lazyLoadOptions = {
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        },
        afterLoad: function(element) {
            if (element.is('img')) {
                // remove background-image style
                element.css('background-image', 'none');
                element.css('min-height', '0');
            } else if (element.is('div')) {
                // set the style to background-size: cover; 
                element.css('background-size', 'cover');
                element.css('background-position', 'center');
            }
        }
    }

    $('img.lazy, div.lazy:not(.always-load)').Lazy({visibleOnly: true, ...lazyLoadOptions});
    $('div.lazy.always-load').Lazy({visibleOnly: false, ...lazyLoadOptions});

    $('[data-toggle="tooltip"]').tooltip()

    var $grid = $('.grid').masonry({
        "percentPosition": true,
        "itemSelector": ".grid-item",
        "columnWidth": ".grid-sizer"
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    $(".lazy").on("load", function () {
        $grid.masonry('layout');
    });

    // Click a publication cover to view it full-size; click anywhere or press Esc to close
    var $lightbox = $('<div class="pub-lightbox" role="dialog" aria-label="Enlarged figure"><img alt=""></div>').appendTo('body');
    $(document).on('click', '.pub-cover-link', function (e) {
        e.preventDefault();
        $lightbox.find('img').attr('src', $(this).attr('href')).attr('alt', $(this).find('img').attr('alt'));
        $lightbox.addClass('show');
    });
    $lightbox.on('click', function () { $lightbox.removeClass('show'); });
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') $lightbox.removeClass('show');
    });
})
