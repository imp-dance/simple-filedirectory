# simple-filedirectory
A simple solution with minimal setup to get an interface on your website for file uploading/downloading - no database needed.
***
![ImagePreview1](http://i.imgur.com/CE62ujm.jpg "Image preview 1")
![ImagePreview2](http://i.imgur.com/tpcMTUS.jpg "Image preview 2")
![ImagePreview3](http://i.imgur.com/TYd7n9D.jpg "Image preview 3")
***
## features

* Drag & Drop upload
* Fast and easy command-style userface, with logical keyboard shortcuts
* Search by up to two keywords (separate by +)
* Embeded media files
* Progress-saving in localstorage (enabled by default)
* Simple .html document creation & uploading directly through website (as well as console interface)
* Graphical interface for listing all images, videos or audio-files.
* Three different themes
* Custom password & key for login
* Set infinite variables in localstorage for quick note-saving
* Eastereggs

## limitations
You can currently only upload one file at the time, and there is a known bug with creating updated versions of html-files through reupload.

## setup
### in steps...
1. **Download all files** as a zip or fork this repo.
2. **Upload** all the files onto your domain
3. If you are not uploading the files to a root:
  * Then I'm sorry but there will be a bunch of dead links. You could create a subdomain and upload the files as root there to make it easy on yourself. 
4. In the files folder, **create an .htaccess file**. You can leave it empty if you want.
5. In *keypass.php*, **change the key and password** to a combination you want.
6. In index.php, on line 68, **add your font-awesome embed-code** (http://fontawesome.io/get-started/).

    > The 'k' and 'YOURURLPASSWORD' will be used to access your site by adding /?k=YOURURLPASSWORD to your url.

> The reason for the htaccess file is because you might want to change permissions in that folder, and list.php is programmed to ignore the first file, which always is .htaccess unless you don't have one, then it ignores one of your files. You could also of course go in and manually edit out the first ignore if you want to do that too.

## contributions 
Any contributions to the repository would be welcome and appreciated. Things that need fixing:
* More stable drag & drop upload
* More stable design around the embeds in "list/search" (flexbox?)
