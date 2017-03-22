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
        echo("<ul id='listfileul'>");
        $o = 1;
        foreach($files as $item) {
            if ($o != 1){ 
                $b = $o - 1;
                $echoi = substr($item, 6, 80);
                $extalone = strtolower(pathinfo($echoi, PATHINFO_EXTENSION));
                if ($extalone == "png" || $extalone == "jpg" || $extalone == "gif"){
                    echo "<li><a href='/files/".$item."' class='listlink' name='".$item."' tabindex='".$o."'>".$echoi."</a> <a href='#' tabindex='-1' data-imglink='/files/".$item."' class='openimgl'>(embed)</a></li>";
                }else if($extalone == "wav" || $extalone == "mp3"){
                    echo "<li><a href='/files/".$item."' class='listlink' name='".$item."' tabindex='".$o."'>".$echoi."</a> <a href='#' tabindex='-1' data-audlink='/files/".$item."' class='openaudl'>(embed)</a></li>";
                }else if($extalone == "mp4" || $extalone == "webm"){
                    echo "<li><a href='/files/".$item."' class='listlink' name='".$item."' tabindex='".$o."'>".$echoi."</a> <a href='#' tabindex='-1' data-vidlink='/files/".$item."' class='openvidl'>(embed)</a></li>";
                }else{
                    echo "<li><a href='/files/".$item."' class='listlink' tabindex='".$o."'>".$echoi."</a></li>";
                }
            }else{
                
            }
            $o++;
        }
        echo("</ul>");
        ?>
        <input type="hidden" id="listisshowing" name="listisshowing" value="true" />
        
</body>
</html>
        <?php
        }
        ?>