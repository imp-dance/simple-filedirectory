<?php
include('keypass.php');
$msg = $_GET['n'];
if ($msg == 1){
    $feed = "<span class='cmd-cont'>File successfully uploaded to <a target='_blank' class='filelink' href='/files/".$_GET['url']."'>".$_GET['url']."</a><br/>Type 'copy' to copy, or 'go' to redirect to file.";
}
$url = $_GET['url'];
$donefileext = substr($url, strrpos($url, '.') + 1);
if (@$_GET[$kpk]==$kpp){
?><!doctype html>
<html>
<head>
	<title>cmd: underbakke</title>
	<link rel="stylesheet" href="style.css">
	<meta name="viewport" content="width=device-width">
</head>
<body>
	<i class="fa fa-spinner fa-spin loadingspin"></i>
	<?php
	if ($msg == 1){
    $feed = "File successfully uploaded to <a target='_blank' class='filelink' href='/files/".$_GET['url']."'>".$_GET['url']."</a><br/>Type 'copy' to copy, or 'go' to redirect to file. (<a class='clbx' href='#'>close</a>)";
	?>
	<div class="msg">
		<?php echo($feed);
		$extalone = $donefileext;/*
		if ($extalone == "png" || $extalone == "jpg" || $extalone == "gif"){
				echo "<img src='/files/".$_GET['url']."' class='upprew' />";
		}else if($extalone == "wav" || $extalone == "mp3"){
				echo "<audio src='/files/".$_GET['url']."' class='upprew' controls />";
		}else if($extalone == "mp4" || $extalone == "webm"){
				echo "<video src='/files/".$_GET['url']."' class='upprew' controls />";
		}else{
			
		}*/
		?>
	</div>
	<?php
		}
	?>
		<div id="input">
		<input type="text" name="cmd" tabindex="1" autofocus id="cmd" />
	</div>
	<div class="wrapper">
    	<div class="dragtext">Drop here to upload</div>
        <form action="uploadscript.php" enctype="multipart/form-data" id="hiddenupload" method="post">
    		<input type="file" name="fileupload" tabindex="-1" id="fileupload" />
    	    <input type="hidden" name="fname" class="fname" />
    	    <input type="submit" tabindex="-1" class="submitbutton" />
    	</form>
		<div class="right-menu">
			<a href="#" onClick="openNew()"><i class="fa fa-plus-square"></i></a>
			<a href="#" class="dosavelink"><input type="checkbox" onClick="changeSave()" class="doSaveCheckbox" name="doSaveCheckbox" /> <label for="doSaveCheckbox"><i class="fa fa-floppy-o"></i></label></a>
		</div>
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
	<!-- YOUR FONT AWESOME LINK -->
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
?>
<html>
<head>
	<title>cmd</title>
	<link rel="stylesheet" href="css.css">
	<meta name="viewport" content="width=device-width">
</head>
<body>
	<?php if(empty($_GET[$kpk])){}else{?><style>
	.pass:focus{    
			box-shadow: 0px 0px 5px 3px #a80000;
	}
	</style><?php } ?>
	<div class="login"<?php if(empty($_GET[$kpk])){}else{?>style="border-color:#a80000;" <?php } ?>>
		<form method="get">
			<label for="<?php echo($kpk); ?>"><?php if(empty($_GET[$kpk])){}else{?>wrong <?php } ?>password</label>
			<input class="pass" autofocus type="password" name="<?php echo($kpk); ?>" />
		</form>
	</div>
</body>
</html>
<?php
}
?>
