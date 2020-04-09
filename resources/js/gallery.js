
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

// Rating the images when they appear
$(document).ready(function(e){
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