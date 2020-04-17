<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lorena Moreno Antequera - Galería</title> 
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="resources/css/style.css">
    <link rel="stylesheet" href="resources/css/gallery.css">
    <link rel="stylesheet" href="resources/css/multimedia.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
    
</head>
<body>
    <!-- Directory scan -->
    <?php
        $directory = getDirContents('./resources/img/gallery');
        $objDirectory = formatDir($directory);
        $galleryJSON = json_encode($objDirectory);

        function getDirContents($dir, &$results = array()) {
            $files = scandir($dir);
        
            foreach ($files as $key => $value) {
                $path = ($dir . DIRECTORY_SEPARATOR . $value);

                if (!is_dir($path)) {
                    $results[] = $path;
                } else if ($value != "." && $value != "..") {
                    getDirContents($path, $results);
                    // $results[] = $path;
                }
            }
        
            return $results;
        }

        function formatDir($directory){
            $gallery = Array();
            
            // We get where the galeries start
            $galeryIndex = strpos($directory[0], "/gallery") + strlen("/gallery/");

            foreach ($directory as $dir) {
                $fullPath = substr($dir, $galeryIndex);
                $sessionName = substr($fullPath, 0, strpos($fullPath, DIRECTORY_SEPARATOR)); 

                //Comprobamos si la session está ya creada
                $sessionFound = false;
                foreach ($gallery as $session) {                
                    if($session->name == $sessionName){
                        $sessionFound = true;
                        break;
                    }
                }
                
                //Preparamos y añadimos la session a la galeria
                if(!$sessionFound){
                    $auxSession = new stdClass;
                    $auxSession->name = $sessionName;
                    $auxSession->imgs = Array();
                    array_push($gallery, $auxSession);
                }
                // Add img to the session
                $file = substr($fullPath, strpos($fullPath, DIRECTORY_SEPARATOR) + 1);
                $auxSession->imgs[] = $file;
            }

            return $gallery;
        }
    ?>


    <!-- NavBar -->
    <div class="nav-icon animated fadeIn delay-2s">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div id="nav-menu" class="overlay">
        <div class="overlay-content">
            <a class="main" href="">Inicio</a>
            <a class="gallery" href="">Galería</a>
            <a class="experience" href="">Experiencia</a>
            <a class="formation" href="">Formación</a>
            <a class="contact" href="">Contacto</a>
        </div>
    </div>

    <!-- Social Media -->
    <div class="socialMedia text-right  animated fadeIn delay-2s">
        <a href="https://www.instagram.com/loremorean" class="text-reset"> <i class="fa fa-instagram mr-4"></i> </a>
        <a href="https://www.facebook.com/lorena.morenoantequera" class="text-reset"> <i class="fa fa-facebook mr-4"></i> </a>
    </div>

    
    <div id="galleryMain" class="container-fluid">
        <header class="header d-none d-md-flex row align-items-center">
            <div class="col-12 text-center animated fadeIn">
                <h1> Galería </h1>
            </div>
        </header>
        <div class="body row text-center mt-5 mt-md-0">
            <div class="col-12 h-100  mt-5 mt-md-0">
                <div class="row align-items-center justify-content-center h-100">
                    <!-- IMAGES -->
                    <div class="imgsGallery col-12 order-1 col-md-5 order-md-2">
                        
                    </div>

                    <!-- PREV BUTTON -->
                    <div class="col-6 order-2 col-md-2 order-md-1 text-md-right animated fadeInRight delay-1s">
                        <i id="galleryPrev" class="fa fa-angle-left fa-4x galButton px-4"></i>    
                        <!-- <h3 id="galleryPrev" class="galButton"> Anterior </h3> -->
                    </div>
                    <!-- NEXT BUTTON -->
                    <div class="col-6 order-3 col-md-2 order-md-3 text-md-left animated fadeInLeft delay-1s">
                        <i id="galleryNext" class="fa fa-angle-right fa-4x galButton px-4"></i>
                    </div>

                    <!-- SESSION NAME -->
                    <div class="titleCont col-12 order-4 animated fadeInDown delay-1s">
                        <h2 class="title"> Nombre de sesión </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="gallerySession" class="container-fluid p-0 ">
        <div class="row justify-content-center">
            <i id="backToGallery" class="fa fa-angle-up fa-4x galButton"></i>   
        </div>
        <div id="session" class="grid mt-3">
        </div>
        

        <!-------------------------------------------------------------}}
        {{------------------------ CAROUSEL ---------------------------}}
        {{------------------------------------------------------------->
        <div id="carousel"> 
            <div class="content">
                <div class="upperPart">
                    <img class="bigImg" src="">
                    <i class="fa fa-times fa-3x X"></i>
                    <i class="fa fa-angle-left fa-4x arrow left"></i>
                    <i class="fa fa-angle-right fa-4x arrow right"></i>
                </div>
            </div>
        </div>
    </div>
    
    <a href="#gallerySession">
        <div id="linkSession"></div>
    </a>

    <div class="goUp" id="goUpGallery">
        <i class="fa fa-angle-up fa-4x"></i>
    </div>

    <!-- Bootsptrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <!-- JQuey -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"> </script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <!-- Plugin ImagesLoaded -->
    <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
    <!-- Plugin columnas -->
    <!-- <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script> -->
    <script src="https://unpkg.com/packery@2/dist/packery.pkgd.min.js"></script>
    <script> 
        var gallery = <?php echo $galleryJSON ?>;
    </script>
    <script src="resources/js/main.js"></script>
    <script src="resources/js/gallery.js"></script>
</body>
</html>
