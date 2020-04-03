

// SCROLLING EFFECT FOR BOXES
$(document).ready(function(e){
    
    var lastScrollTop = 0;
    $(window).scroll(function(e){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            // downscroll code
        } else {
            // upscroll code
        }
        lastScrollTop = st;
    });
    console.log(lastScrollTop);

});
