<?php
include('keypass.php');
ob_start();
setlocale(LC_ALL,'en_US.UTF-8');
if(isset($_POST))
{
$pic = $_POST['fname'];
$file = $_FILES['fileupload'];
if (!$file){die("huh");}
$folder="/files/";
$ext = pathinfo($_FILES['fileupload']['name'], PATHINFO_EXTENSION);
$filenamedir = $pic.".".$ext;
if(move_uploaded_file($_FILES['fileupload']['tmp_name'], 'files/' . $filenamedir)){
    $response_array['status'] = 'success';
    $response_array['success'] = true;
    echo json_encode($response_array);
    header("Location: /?".$kpk."=".$kpp."&n=1&url=".$filenamedir);
}else{
    $response_array['status'] = 'error';
    $response_array['success'] = false;
    echo json_encode($response_array);
} 
}else{
    echo "pikk";
}
?>