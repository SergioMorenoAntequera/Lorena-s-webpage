
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
$.fn.fadeAndSlide = function(duration, direction, distance) {
    $(this).css({
        opacity: 0,
    });
    
    $(this).animate({
        opacity: "1",
        

    }, duration);

    // var args = $.speed(duration, easing, complete);
    // var step = args.step;
    // return this.each(function(i, e) {
    //   args.complete = $.proxy(args.complete, e);
    //   args.step = function(now) {
    //     $.style(e, 'transform', 'rotate(' + now + 'deg)');
    //     if (step) return step.apply(e, arguments);
    //   };
  
    //   $({deg: 0}).animate({deg: angle}, args);
    // });
};


var imgsGallery = $(".imgsGallery");
// imgsGallery.fadeAndSlide(100000, "bottom");

// Placing the images in the center and rotating them
$(document).ready(function(e){

    

    // Adding the images from the directory
    gallery.forEach(session => {
        imgsGallery.append("<div class='img-container'> <img class='imgGallery ' src='resources/img/gallery/"+ session.name +"/"+ session.imgs[0] +"' alt=''> </div>");
    });
    
    // Rotating them
    let rotationDirection = true;
    let imgsInGallery = $(".imgGallery");
    imgsInGallery.each(function(e){
        rotateImg($(this))
    });

    function rotateImg(element){
        let rotation;
        if(rotationDirection){
            rotation = Math.random() * (10 - 6) + 6;
        } else {
            rotation = Math.random() * (-6 - (-10)) + -10;
        }
        element.animateRotate(rotation, 1400);
        rotationDirection = !rotationDirection;
    };
});