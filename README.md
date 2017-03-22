# simple-filedirectory
A simple solution with minimal setup to get a console on your website with file uploading/downloading
![ImagePreview1](http://i.imgur.com/HVEADcR.png "Image preview 1")
![ImagePreview2](http://i.imgur.com/o6bOoAT.png "Image preview 2")

## features
You can drag & drop uploads, list and/or search through your uploads, embed pictures, videos and audio directly in the search/list display.

## limitations
You can currently only upload one file at the time.

## setup
To setup, simply download all the files and put them in an empty directory on your server (make sure you also make /files/). **List.php ignores the first file from "/files/"**, you should just put an empty .htaccess in if you don't have an .htaccess to avoid having any issues with this. **To change the site password** go to index.php and change `if (@$_GET['k']=='YOURURLPASSWORD'){` on line 6. Change "k" and "YOURURLPASSWORD" to whatever you want, and access the site at http://yourdomain.com/?k=YOURURLPASSWORD with "k" and "YOURURLPASSWORD" changed to whatever you changed it to. 

### in steps...
1. Download all files as a zip or fork this repo.
2. Upload all the files onto your domain
3. If you are not uploading the files to root:
  * Go into uploadscript.php
  * On line 16, edit `"Location: /?k=a&n=1&url="` to the correct location. For example: `"Location: /subFolder1/subFolder2/?k=a&n=1&url="`
4. In the files folder, create an .htaccess file if you don't have one. You can leave it empty if you need to create one.
5. In *index.php* on line 6, change `if (@$_GET['k']=='YOURURLPASSWORD'){` to a combination you want to use as a password.

    > The 'k' and 'YOURURLPASSWORD' will be used to access your site by adding /?k=YOURURLPASSWORD to your url.

## demo
Demo can be found here: http://simple-filedirectory.underbakke.net/?k=YOURURLPASSWORD (the actual upload script is removed though because the link is public).

## known bugs
 * Drag to upload sometimes doesn't work after using cls/clear.
