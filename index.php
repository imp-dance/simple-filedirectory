<?php
include('keypass.php');
$msg = $_GET['n'];
if ($msg == 1){
    $feed = "<span class='cmd-cont'>File successfully uploaded to <a target='_blank' class='filelink' href='http://cmd.underbakke.net/files/".$_GET['url']."'>".$_GET['url']."</a><br/>Type 'copy' to copy, or 'go' to redirect to file.";
}
if (@$_GET[$kpk]==$kpp){
?><!doctype html>
<html>
<head>
	<title>cmd</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="input">
		<input type="text" name="cmd" tabindex="1" id="cmd" />
	</div>
	<div class="wrapper">
    	<div class="dragtext">Drop here to upload</div>
        <form action="uploadscript.php" enctype="multipart/form-data" id="hiddenupload" method="post">
    		<input type="file" name="fileupload" tabindex="-1" id="fileupload" />
    	    <input type="hidden" name="fname" class="fname" />
    	    <input type="submit" tabindex="-1" class="submitbutton" />
    	</form>
    	<div id="container">
    	    <?php if ($msg == 1){ 
    	        echo $feed;
    	    }else{ ?>
    		<span class="cmd-cont">type 'help' to get a list of commands.</span>
    		<?php } ?>
    	</div>
    </div>
	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
	
	    <input type="hidden" name="lastcmd" class="lastcmd" value="cls" />
	    <input type="hidden" name="isuploading" class="isup" value="fa" />

  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <?php
	if ($msg == 1){
	?>
	<script>
	    var hasUploaded = true;
	</script>
	<?php
	}else{
	?>
	<script>
	    var hasUploaded = false;
	</script>
	<?php
	}
	?>
	<script src="script.js"></script>
</body>
</html>
<?php
}else{
header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
}
?>
