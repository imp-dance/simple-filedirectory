<?php
        function requestedByTheSameDomain() {
            $myDomain       = $_SERVER['SCRIPT_URI'];
            $requestsSource = $_SERVER['HTTP_REFERER'];
            return parse_url($myDomain, PHP_URL_HOST) === parse_url($requestsSource, PHP_URL_HOST);
        }
        if (requestedByTheSameDomain()){
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
        }else{
?><!doctype html>
<html>
<head>
	<title>cmd/list</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
        <?php
        $path    = 'files/';
        $files = scandir($path);
        $files = sort($files);
        $files = array_diff(scandir($path), array('.', '..'));
        echo("<div id='gallery'>");
        $o = 1;
        foreach($files as $item) {
            if ($o != 1){ 
                $b = $o - 1;
                $echoi = substr($item, 6, 80);
                $extalone = strtolower(pathinfo($echoi, PATHINFO_EXTENSION));
                if ($extalone == "png" || $extalone == "jpg" || $extalone == "gif"){
                    echo "<img src='/files/".$item."' class='galleryimg' name='".$item."' />";
                }else{
                    // nada
                }
            }else{
                
            }
            $o++;
        }
        echo("<div class='clear'></div></div>");
        ?>
        <input type="hidden" id="listisshowing" name="listisshowing" value="true" />
        
</body>
</html>
        <?php
        }
        ?>