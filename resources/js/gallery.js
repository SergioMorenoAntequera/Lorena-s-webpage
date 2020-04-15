//////////////////////////////////////////////////////////////////////////////////////////////////
// GALLERY ///////////////////////////////////////////////////////////////////////////////////////
var imgsGallery = $(".imgsGallery");
var imgsInGallery;

// INITIAL IMG PLACEMENT AND ROTATION
$(document).ready(function(e){
    window.scrollTo(0, 0);
    // Adding the images from the directory
    gallery.forEach(session => {
        imgsGallery.append("<div class='img-container'> <img class='imgGallery ' src='resources/img/gallery/"+ session.name +"/"+ session.imgs[0] +"' alt=''> </div>");
    });
    
    // TITLE
    let titleCont = $(".img-container");
    titleCont = titleCont.children()[titleCont.children().length - 1];
    updateTitle((jQuery(titleCont).attr("src")));

    // ROTATION    
    let firstRotation;
    if(Math.random() > 0.5 ? firstRotation = true :  firstRotation = false);
    imgsInGallery = document.querySelectorAll(".imgGallery");
    imgsInGallery.forEach(img => {
        animateCSS(img, "fadeInDown", function(){
            // When they are done going down we rotate them
            let rotation;
            if(firstRotation){
                rotation = Math.random() * (10 - 6) + 6;
            } else {
                rotation = Math.random() * (-6 - (-10)) + -10;
            }
            jQuery(img).animateRotate(rotation, 1000);
            firstRotation = !firstRotation;
        }); 
    });

    
});

// CHANGING IMAGES BUTTON
$(document).ready(function(e){
    canChangeImg = true;
    
    $("#galleryPrev").click(function(e){
        if(canChangeImg){
            canChangeImg = false;
            changeGallery("prev");          
        }
    });

    $("#galleryNext").click(function(e){
        if(canChangeImg){
            canChangeImg = false;
            changeGallery("next")            
        }
    });

    function changeGallery(direction){
        let galleryJS = document.querySelector(".imgsGallery");
        let containers = document.querySelectorAll(".img-container");
       
        
        if(direction == "next"){
            let actualContainer = containers[containers.length - 1];
            updateTitle(jQuery(containers[containers.length - 2]).find("img").attr("src"));
            // Next
            animateCSS(actualContainer, "fadeOutRight", function(){
                animateCSS(actualContainer, "fadeIn");
                galleryJS.prepend(actualContainer);
                canChangeImg = true;
            });

        } else {
            let actualContainer = containers[0];
            updateTitle(jQuery(actualContainer).find("img").attr("src"));
            // updateTitle(actualContaincer);
            // Previous
            galleryJS.append(actualContainer);
            animateCSS(actualContainer, "fadeInLeft", function(){
                canChangeImg = true;
            }); 
        }      
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////
// SESSION ///////////////////////////////////////////////////////////////////////////////////////

let sessionArea = $("#gallerySession");
let session = $("#session");
session.packery({
    itemSelector: '.grid-item',
});
let canSeeSession = true;

//SHOWING AND HIDDING SESSION PICTURES
$(document).ready(function(e){
    

    // SHOW THE SESSION
    $(".imgGallery").click(function(e){
        e.stopPropagation();

        if(canSeeSession){
            canSeeSession = false;
            
            // Add the images of the session
            let sessionJS =  getActualSession();
            sessionJS.imgs.forEach(img => {
                let $elementToAdd = $("<div class='grid-item animated fadeInUp'> <img src='resources/img/gallery/"+ sessionJS.name + "/"+ img +"' alt=''> </div>");
                $elementToAdd.imagesLoaded(function(){
                    session.append( $elementToAdd ).packery('appended', $elementToAdd);
                });
            });

            // Go down
            $(document).scrollTop(sessionArea.offset().top);
            moveTitleDown();
        }
    });
    
    // HIDE THE SESSION
    $("#backToGallery").click(function(e){
        $(document).scrollTop(0);
        moveTitleUp();
        canSeeSession = true;
    });
    $("a.gallery").click(function(){
        $("#backToGallery").click();    
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////
// EXTRA /////////////////////////////////////////////////////////////////////////////////////////
// Button go up
$(document).ready(function(e){
    $("#goUpGallery").click(function(){
        $("#backToGallery").click();
    })
})

/********************************************************/
/**************** AUX FUNCTIONS GALLERY ****************/
/*******************************************************/

// JQUERY ROTATE PLUGIN
$.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
      args.complete = $.proxy(args.complete, e);
      args.step = function(now) {
        $.style(e, 'transform', 'rotate(' + now + 'deg)');
        if (step) return step.apply(e, arguments);
      };
  
      $({deg: 0}).animate({deg: angle}, args);
    });
};

// ACTIVATE DESACTIVATE AIMATIONS
function animateCSS(element, animationName, callback) {
    const node = (element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function updateTitle(imgSRC){
    // Obtain actual Session name
    let aux = imgSRC.search("/gallery/") + 9;
    aux = imgSRC.substring(aux, imgSRC.length);
    aux = aux.substring(0, aux.search("/"));

    let galleryTitle = $(".title");
    galleryTitle.text(aux);
}

function getActualSession(){
    let actualSession = null;
    gallery.forEach(session => {
        if(session.name == $(".title").text()){
            actualSession = session;
        }
    });
    return actualSession;
}

function moveTitleDown(){
    let upB = $("#backToGallery");
    let title = $(".title");
    
    let distanceToMoveTitle = upB.offset().top + 64 - title.offset().top;
    
    // To know how much we have to go down
    title.css("font-size", "60px");
    $("#session").css({top: parseInt(title.height())});
    title.css("font-size", "40px");

    //Animation going down
    if(title.css("top") != 0){
        title.animate({
            top: distanceToMoveTitle + 10,
            "font-size" : "65px",
        },500, function(){
            title.animate({
                top: distanceToMoveTitle,
                "font-size" : "60px",
            });
        });
    }
    
}

/******************************************************/
/**************** AUX FUNCTIONS SESSION ****************/
/******************************************************/

function moveTitleUp(){
    let title = $(".title");
    title.animate({
        top: "-10px",
        "font-size" : "35px",
    },500, function(){
        title.animate({
            top: "0px",
            "font-size" : "2rem",
        }, function(){
            removeImagesFromGrid();
        });
    });
}

function removeImagesFromGrid(){
    let $aux = $(".grid-item");
    session.packery('remove', $aux).packery('layout');
    $aux.remove();
}