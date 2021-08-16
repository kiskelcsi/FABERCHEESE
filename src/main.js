

    $(document).ready(function(){
        // flickity (aka. Slide bar)
     
        $('.main-carousel').flickity({
            // options
            cellAlign: 'left',
            wrapAround: true,
            contain: true
        });

        // smoothe scrolling
        $(function() {
            $('a[href*="#"]').on('click', function (event) {
                event.preventDefault();
                let target = $(this.hash);
                $('html, body').animate({                
                    scrollTop: target.offset().top
                        }, 1200);
                        return false;                                                         
                });
        });
    });





// Checks for valid characters