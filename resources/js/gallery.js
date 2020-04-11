//  Codigo nav
$(document).ready(function(){
	$('.nav-icon').click(function(){
		$(this).toggleClass('open');
	});
});

// Plugin para rotar
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



var imgsGallery = $(".imgsGallery");
var imgsInGallery;
// imgsGallery.fadeAndSlide(100000, "bottom");

// Placing the images in the center and rotating them
$(document).ready(function(e){

    // Adding the images from the directory
    gallery.forEach(session => {
        imgsGallery.append("<div class='img-container'> <img class='imgGallery ' src='resources/img/gallery/"+ session.name +"/"+ session.imgs[0] +"' alt=''> </div>");
    });
    

    imgsInGallery = $(".imgGallery");
    imgsInGallery.each(function(e){
        //Show and rotate images 
        $(this).hide().delay(250).show("drop", { direction: "up", distance:50 }, 700, function(){
            rotateImg($(this));
        });
    });  
});
function rotateImg(element){
    // Rotating them
    let rotationDirection;
    if(parseInt(Math.random()*10) >= 5 ? rotationDirection = true : rotationDirection = false);
    
    let rotation;
    if(rotationDirection){
        rotation = Math.random() * (10 - 6) + 6;
    } else {
        rotation = Math.random() * (-6 - (-10)) + -10;
    }
    element.animateRotate(rotation, 1000);
    rotationDirection = !rotationDirection;
};

$(document).ready(function(e){
    canChangeImg = true;
    
    $("#galleryPrev").click(function(e){
        if(canChangeImg){
            canChangeImg = false;
            changeGallery("prev")            
        }
    });

    $("#galleryNext").click(function(e){
        if(canChangeImg){
            canChangeImg = false;
            changeGallery("next")            
        }
    });


    function changeGallery(direction){
        let containers = $(".img-container");
        
        if(direction == "next"){
            // Next
            let actualContainer = jQuery(containers.last());
            let actualImg = actualContainer.find("img");
            actualImg.hide("drop", { direction: "right", distance: 100 }, 500, function(e){
                actualContainer.remove();
                actualContainer.prependTo(imgsGallery);
                actualImg.fadeIn(500);
                
                canChangeImg = true;
            });
        } else {
            // Previous
            let actualContainer = jQuery(containers.first());
            let actualImg = actualContainer.find("img");
            actualImg.hide();
            actualContainer.remove();
            actualContainer.appendTo(imgsGallery);
            
            actualImg.show("drop", { direction: "left", distance: 50 }, 500, function(e){
                
                canChangeImg = true;
            });
        }
        
    }
}); 