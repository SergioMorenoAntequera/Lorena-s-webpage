

// SCROLLING EFFECT FOR BOXES
$(document).ready(function(e){
    
    let lastScrollTop = 0;
    let boxes = $("#gallery");
    let initialTop = parseInt(boxes.css("top").replace("px", ""));
    let speed = 7;

    $(window).scroll(function(e){
        let st = $(this).scrollTop();

        if (st > lastScrollTop){
            move(speed);
        } else {
            move(-speed);
        }
        if(st == 0){
            boxes.animate({
                top: initialTop, 
            }, 50);
        }

        lastScrollTop = st;
        console.log(boxes.css("top"));
    });
    
    function move(speed){
        boxes.animate({
            top: "-="+speed, 
        }, 10);
    };
});
