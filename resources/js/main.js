
// Change index bg image
$(document).ready(function(e){
    let body = $("#main")
    let imagesURL = "resources/img/"
    let images = ["main1.jpeg", 
        "main2.jpeg",
        "main3.jpeg"
    ];
    let index = 0;
    let changeBG = function(){
        console.log(index);
        body.css({"background-image": "url("+ imagesURL + images[index] +")"});
        if(++index >= images.length)
            index = 0;
        setTimeout(changeBG, 3000);
    }
    changeBG();

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


