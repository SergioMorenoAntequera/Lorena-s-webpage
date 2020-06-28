
$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}

// Change index bg image
$(document).ready(function(e){
    let body = $("#main")
    let imagesURL = "resources/img/main/"
    let images = [imagesURL+"main1.jpeg", 
        imagesURL+"main2.jpeg",
        imagesURL+"main3.jpeg",
        imagesURL+"main4.jpeg"
    ];
    $([images[0],images[1],images[2],images[3]]).preload();

    let index = 1;
    let changeBG = function(){
        // console.log(index);
        body.css({"background-image": "url("+images[index] +")"});
        if(++index >= images.length)
            index = 0;
        setTimeout(changeBG, 3000);
    }
    setTimeout(changeBG, 3000);
});

// Hover on blackboxes
$(document).ready(function(e){
    
    $(".boxAndText").hover(function(e){
        bb = $(this).find(".blackBox");

        bb.css({
            opacity: 0.2,
        });

    }, function(e){

        bb.css({
            opacity: 0.5,
        });
    });
});

//Change modal video in jobsList
$(document).ready(function(e){
    //Poner el video
    $(".oneJob.withVideo").click(function(e){
        let videoUrl = $(this).attr("src");
        videoUrl = videoUrl.replace("watch?v=", "embed/");
        $("#jobsVideo").attr("src", videoUrl);
    });

    //Parar el video al cerrar
    $('#jobsModal .close').on('click', function (e) {
        $("#jobsVideo").attr("src", "");
    });
    $('#jobsModal').on('click', function (e) {
        e.stopPropagation();
        $("#jobsVideo").attr("src", "");
    });
    

});

//fadeInFromBottom
$(document).ready(function(e){
    let initialScroll = $(this).scrollTop();
    var elements = $(".fadeInFromBottom"); 

    // To show the elements that we have already gone through
    // so we only get the effect when we open it and not in refresh
    elements.each(function(e) {
        if($(this).offset().top - screen.height*80/100 < initialScroll){
            fadeInFromBottom($(this), 300);
        }
    });

    // To show new emenelt as you scroll down
    $(window).scroll(function(e){
        let st = $(this).scrollTop();
        elements.each(function(e) {
            if(st > $(this).offset().top - screen.height*80/100){
                fadeInFromBottom($(this), 300);
            }
        });
    });

    function fadeInFromBottom(element, speed) {
        element.animate({
            opacity: 1,
            top: "0px",
        }, speed);
    }
});

//AppearingFromBox // .appearingFromBox
$(document).ready(function(e){
    let initialScroll = $(this).scrollTop();
    let elements = $(".appearingFromBox");
    $( "<div class='magicBox'></div>").insertBefore(elements);
    
    elements.each(function(e){
        placeMagicBox($(this)); 
    });

    elements.each(function(e){
        if($(this).offset().top - screen.height*80/100 < initialScroll){
            magicBoxAnimation($(this));
        }
    });

    

    // To show new emenelt as you scroll down
    $(window).scroll(function(e){
        let st = $(this).scrollTop();
        elements.each(function(e) {
            if(st > $(this).offset().top - screen.height*80/100){
                if($(this).prev().css("display") == "none")
                    magicBoxAnimation($(this));
            }
        });
    });

    function placeMagicBox(element){
        let position = element.position();
        let width = element.width() + parseInt(element.css("paddingLeft")) + parseInt(element.css("paddingRight"));
        
        let left = position.left + parseInt(element.css('marginLeft'));
        let top = position.top + parseInt(element.css('marginTop'));

        let magicBox = element.prev();
        magicBox.css({
            top:top, 
            left:left,
            width:width,
        });
    }

    function magicBoxAnimation(element){
        let box = element.prev();
        box.css({display:"block"});
        box.animate({
            height: element.height()
        },400, function(){
            element.animate({
                opacity: 1
            }, 1, function(){
                box.animate({
                    top: "+=" + element.height(),
                    height: "0px",
                }, 400);
            });
        });
    }

});

// TO GO UP
$(document).ready(function(e){
    $(".goUp").click(function(e){
        window.scrollTo(0, 0); 
    });

    $(window).scroll(function(e){
        let st = $(this).scrollTop();
        if($(".goUp").css("display") == "none" && st > 0) {
            $(".goUp").fadeIn(300);
        }
        if(st == 0){
            $(".goUp").fadeOut(300);
        }
    });
});

/***********************************************/
/******************** NAV MENU *****************/
/***********************************************/
//  NAV
$(document).ready(function(){
    let overlay = $(".overlay");
    let links  = $(".overlay-content");
    let url = window.location.href;
 
    // Es una aplicación pequeña, no me quiero complicar
    if(!url.includes("gallery")){
        url = url.substr(0, url.indexOf("/gallery.php"));
        links.find(".main").attr("href", "#");
        links.find(".gallery").attr("href", url+"gallery.php");
        links.find(".experience").attr("href", url+"#jobs");
        links.find(".formation").attr("href", url+"#formation");
        links.find(".contact").attr("href", url+"#contactBottom");
    }else {
        url = url.substr(0, url.indexOf("/gallery.php"));
        links.find(".main").attr("href", url);
        links.find(".gallery").attr("href", "#");
        links.find(".gallery").css("color", "#68040d")
        links.find(".experience").attr("href", url+"#jobs");
        links.find(".formation").attr("href", url+"#formation");
        links.find(".contact").attr("href", url+"#contactBottom");
    }

    $('.nav-icon').click(function(){
        $(this).toggleClass('open');
        if($(this).hasClass("open")){
            overlay.css({height: "100%"});
        } else {
            overlay.css({height: "0%"});
        }
    });

    $(".overlay-content a").click(function(){
        $('.nav-icon').toggleClass('open');
        overlay.css({height: "0%"});
    });
});


// SCROLLING EFFECT FOR BOXES
// $(document).ready(function(e){
//     let lastScrollTop = 0;
//     let boxes = $("#content");
    
//     let initialTop = parseInt(boxes.css("top").replace("px", ""));
//     let speed = 7;

//     boxes.css({"top": $("#main").height()});
//     console.log($("#main").height());

//     $(window).scroll(function(e){
//         let st = $(this).scrollTop();
//         console.log(e);
        
//         if (st > lastScrollTop){
//             move(speed);
//         } else {
//             move(-speed);
//         }
//         if(st == 0){
//             boxes.animate({
//                 top: initialTop, 
//             }, 50);
//         }

//         lastScrollTop = st;
//         console.log(boxes.css("top"));
//     });
//     function move(speed){
//         boxes.animate({
//             top: "-="+speed, 
//         }, 10);
//     };
// });


