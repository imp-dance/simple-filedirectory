# simple-filedirectory
A simple solution without setup to get a console on your website with file uploading/downloading
[ImagePreview1](http://i.imgur.com/HVEADcR.png "Image preview 1")
[ImagePreview2](http://i.imgur.com/o6bOoAT.png "Image preview 2")

## features
You can drag & drop uploads, list and/or search through your uploads, embed pictures, videos and audio directly in the search/list display.

## limitations
You can currently only upload one file at the time.

## setup
To setup, simply download all the files and put them in an empty directory on your server (make sure you also make /files/). **List.php ignores the first file from "/files/"**, you should just put an empty .htaccess in if you don't have an .htaccess to avoid having any issues with this. **To change the site password** go to index.php and change `if (@$_GET['k']=='YOURURLPASSWORD'){` on line 6. Change "k" and "YOURURLPASSWORD" to whatever you want, and access the site at http://yourdomain.com/?k=YOURURLPASSWORD with "k" and "YOURURLPASSWORD" changed to whatever you changed it to. 

## demo
Demo can be found here: http://simple-filedirectory.underbakke.net/?k=YOURURLPASSWORD (the actual upload script is removed though because the link is public).
