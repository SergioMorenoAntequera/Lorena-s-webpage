<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title> 
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="resources/css/style.css">
    <link rel="stylesheet" href="resources/css/gallery.css">
    
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
    
    <div id="galleryMain" class="container-fluid bg-danger">
        <header class="header row bg-secondary">
            <!-- Menú -->
            <div class="col-3 text-left bg-danger">
                Menú button
            </div>
            <!-- Name -->
            <div class="col-6 text-center">
                Lorena Moreno Antequera
            </div>
            <!-- Social Media -->
            <div class="col-3 text-right bg-danger">
                Inta / Facebook
            </div>
        </header>

        <div class="body row bg-primary text-center justify-content-center">
            <div class="col-12 bg-success h-100">
                <div class="row align-items-center justify-content-center h-100">
                    <div class="col-6 order-2 col-md-2 order-md-1 text-md-right bg-danger">
                        <button id="galleryPrev"> PREVIOUS </button>
                    </div>
                    <div class="imgsGallery col-12 order-1 col-md-5 bg-warning h-75">
                        <!-- <div class="img-container">
                            <img class="imgGallery" src="resources/img/formation/formation1.jpg" alt="">
                        </div> -->
                    </div>
                    <div class="col-6 order-3 col-md-2 order-md-3 text-md-left bg-danger">
                        <button id="galleryNext"> NEXT </button> 
                    </div>

                    <div class="col-12 order-4 bg-dark h-25">
                        <h1> Titulo de la coleccion </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootsptrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <!-- JQuey -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"> </script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script> 
        var gallery = <?php echo $galleryJSON ?>;
    </script>
    <script src="resources/js/main.js"></script>
    <script src="resources/js/gallery.js"></script>
</body>
</html>
