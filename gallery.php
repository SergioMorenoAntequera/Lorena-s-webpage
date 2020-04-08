<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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

    <script> 
        var gallery = <?php echo $galleryJSON ?>; 
        console.log(gallery)
    </script>

    

    
</body>
</html>
