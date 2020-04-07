<?php

    
    
    $directory = getDirContents('./resources/img/gallery');

    for ($i=0; $i < sizeof($directory); $i++) { 
        var_dump($directory[$i]);
        echo("<br>");
    }


    function getDirContents($dir, &$results = array()) {
        $files = scandir($dir);
    
        foreach ($files as $key => $value) {
            $path = ($dir . DIRECTORY_SEPARATOR . $value);

            if (!is_dir($path)) {
                $results[] = $path;
            } else if ($value != "." && $value != "..") {
                getDirContents($path, $results);
                $results[] = $path;
            }
        }
    
        return $results;
    }
?>