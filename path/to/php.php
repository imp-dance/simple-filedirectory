<?php
if(!empty($_POST['data'])){
$data = $_POST['data'];
$datafilename = $_POST['filename'];
/*if (!empty($_POST['donew'])){
  if ($_POST['donew'] == "yas"){
    $datafilename = $datafilename."-new";
  }
}*/

  $data = "<!doctype html><head><meta charset='utf-8'><title>".$datafilename."</title><link rel='stylesheet' href='../phpcss.css' /></head><body style='padding-bottom:130px;'>
<div id='mamamama'>" . $data . "</div>
<div id='abcabcabc-sourcekocode'>
<a href='/path/to/upload/".$datafilename."-n.html' class='newlink'>goto -new &rarr;</a>
<form action='/path/to/php.php' method='post'>
<textarea id='dastext' name='data'>" . $data . "</textarea>
<input type='hidden' name='filename' value='".$datafilename."' />
<input type='hidden' name='donew' value='yas' />
<input type='submit' value='Reupload as -new' />
</form>
<a href='#' onClick='previewHTML()' class='previewhtml'>preview</a>
</div><script src='https://code.jquery.com/jquery-1.10.2.js'></script><script src='../phpjs.js'></script></body></html>";

  
if (file_exists("upload/".$datafilename.".html")){ /**plssss */
  $datafilename = $datafilename . "-n";
  if (file_exists("upload/".$datafilename.".html")){ 
    $datafilename = $datafilename . "-n";
    if (file_exists("upload/".$datafilename.".html")){ /**dont */
      $datafilename = $datafilename . "-n";
      if (file_exists("upload/".$datafilename.".html")){
        $datafilename = $datafilename . "-n";
        if (file_exists("upload/".$datafilename.".html")){
          $datafilename = $datafilename . "-n";
          if (file_exists("upload/".$datafilename.".html")){ /**even */
            $datafilename = $datafilename . "-n";
            if (file_exists("upload/".$datafilename.".html")){
              $datafilename = $datafilename . "-n";
              if (file_exists("upload/".$datafilename.".html")){ /**look */
                $datafilename = $datafilename . "-n";
                if (file_exists("upload/".$datafilename.".html")){/**at */
                  $datafilename = $datafilename . "-n";
                  if (file_exists("upload/".$datafilename.".html")){
                    $datafilename = $datafilename . "-n";
                    if (file_exists("upload/".$datafilename.".html")){
                      $datafilename = $datafilename . "-n";
                      if (file_exists("upload/".$datafilename.".html")){
                        $datafilename = $datafilename . "-n";
                        if (file_exists("upload/".$datafilename.".html")){/**thissssssssssssssssssss:((( */
                          $datafilename = $datafilename . "-final";
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}$fname = $datafilename . ".html";
$file = fopen("upload/" .$fname, 'w');//creates new file
fwrite($file, $data);
fclose($file);
header("Location: /path/to/upload/$datafilename.html");
}
?>