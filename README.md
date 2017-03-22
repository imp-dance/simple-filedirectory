# simple-filedirectory
A simple solution with minimal setup to get an interface on your website for file uploading/downloading - no database needed.
***
![ImagePreview1](http://i.imgur.com/HVEADcR.png "Image preview 1")
![ImagePreview2](http://i.imgur.com/o6bOoAT.png "Image preview 2")
***
## features
You can drag & drop uploads, list and/or search through your uploads, embed pictures, videos and audio directly in the search/list display.

## limitations
You can currently only upload one file at the time.

## setup
### in steps...
1. Download all files as a zip or fork this repo.
2. Upload all the files onto your domain
3. If you are not uploading the files to a root:
  * Go into uploadscript.php
  * On line 16, edit `"Location: /?k=a&n=1&url="` to the correct location. For example: `"Location: /subFolder1/subFolder2/?k=a&n=1&url="`
4. In the files folder, create an .htaccess file. You can leave it empty if you want.
5. In *index.php* on line 6, change `if (@$_GET['k']=='YOURURLPASSWORD'){` to a combination you want to use as a password.

    > The 'k' and 'YOURURLPASSWORD' will be used to access your site by adding /?k=YOURURLPASSWORD to your url.

> The reason for the htaccess file is because you might want to change permissions in that folder, and list.php is programmed to ignore the first file, which always is .htaccess unless you don't have one, then it ignores one of your files. You could also of course go in and manually edit out the first ignore if you want to do that too.

## demo
Demo can be found here: http://simple-filedirectory.underbakke.net/?k=YOURURLPASSWORD (the actual upload script is removed though because the link is public).

## known bugs
 * Drag to upload sometimes doesn't work after using cls/clear.
 * Minified script.js has a problem with drag & drop upload.

## contributions 
Any contributions to the repository would be welcome and appreciated. Things that need fixing:
* More stable drag & drop upload
* More stable design around the embeds in "list/search" (flexbox?)
