//  NAV
$(document).ready(function(){
	$('.nav-icon').click(function(){
		$(this).toggleClass('open');
	});
});

// ROTATE PLUGIN
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


var imgsGallery = $(".imgsGallery");
var imgsInGallery;
// INITIAL IMG PLACEMENT AND ROTATION
$(document).ready(function(e){
    // Adding the images from the directory
    gallery.forEach(session => {
        imgsGallery.append("<div class='img-container'> <img class='imgGallery ' src='resources/img/gallery/"+ session.name +"/"+ session.imgs[0] +"' alt=''> </div>");
    });
    
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

    // TITLE
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

function updateTitle(imgSRC){
    // Obtain actual Session name
    let aux = imgSRC.search("/gallery/") + 9;
    aux = imgSRC.substring(aux, imgSRC.length);
    aux = aux.substring(0, aux.search("/"));

    let galleryTitle = $(".title").find("h1");
    galleryTitle.text(aux);
}