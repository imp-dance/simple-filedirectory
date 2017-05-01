$(document).on('dragover', '.wrapper', function(e) {
    e.preventDefault();
    $("#fileupload").addClass('ishovered');
    $(".dragtext").show();
});
var zeid;
$(document).on('dragleave', '.wrapper', function(e) {
    e.preventDefault();
    $("#fileupload").removeClass('ishovered');
    $(".dragtext").hide();
});
$(document).on('drop', '.wrapper', function(e) {
    /*e.preventDefault();*/
    $("#fileupload").removeClass('ishovered');
    $(".dragtext").hide();
});
document.addEventListener('play', function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause();
        }
    }
}, true);
$(window).unload(function() {
  if (typeof(Storage) !== "undefined") {
		localStorage.setItem("progress", $("#container").html());
		if ($(".document-parent").length){
			localStorage.setItem("filewindow", $(".document-parent").html());
		}
	}
});
$(document).ready(function() {
	
	if (localStorage.getItem("dontsave") == "true"){
		$(".doSaveCheckbox").prop('checked', false);
	}else{
		$(".doSaveCheckbox").prop('checked', true);
	}
	$("body").on("keyup", "#jsconsole", function(e) {
    if (e.which == 13) {
			e.preventDefault();
      var consvalue = $("#jsconsole").val();
			$(".output-js").prepend(consvalue + "<br />");
			$("#jsconsole").val("");
			eval(consvalue);
		}
		});
	$("body").on("keyup", ".document-parent", function(e) {
		
	if (e.which == 27){
			e.preventDefault();
			doCloseDoc();
		setTimeout(function(){
		$("#closebut").focus();
	}, 100);
		}
	});
	$('body').on('mousedown', '.document span', function(b) {
    var startX = b.pageX;
    var startY = b.pageY;
    var startCtX = parseInt($(this).parent(".document").parent().css("left"));
    var startCtY = parseInt($(this).parent(".document").parent().css("top"));
    
    $("html").on('mousemove', 'body', function(m) {
        $(this).parent(".document").parent().css("left", (m.pageX - startX + startCtX) + "px");
        $(this).parent(".document").parent().css("top", (m.pageY - startY + startCtY) + "px");
    }).mouseup(function() {
        $("html").unbind("mousemove");
    });
  });
  

  
    /* $('#dropHere').sortable(
     {

       receive: function(event, ui)
       {

       }

     });*/

  $('.document').draggable();
	delegateTextarea();
  $("body").on("click", ".closedocument", function(){
      $(this).find(".document-parent").remove();
  });
	
	
	
	function changeTheme(e){
		if (e == "projcode" || e == "proj_code" || e == "pc" || e == "code"){
			$(".themesh").remove();
			$("head").append("<link rel='stylesheet' href='projcode.css' class='themesh' />");
		}else if (e == "typewriter" || e == "tp" || e == "write" || e == "clean"){
			$(".themesh").remove();
			$("head").append("<link rel='stylesheet' href='typewriter.css' class='themesh' />");
		}else if (e == "regular" || e == "normal" || e == "sl1ck" || e == "reset"){
			$(".themesh").remove();
		}
	}
	function formatDate(date) {
	  var monthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  ];
	
	  var day = date.getDate();
	  var monthIndex = date.getMonth();
	  var year = date.getFullYear();
	  var hour = date.getHours();
	  var min = date.getMinutes();
	
	  return day + ' ' + monthNames[monthIndex].substr(0, 3) + '. ' + hour + ':' + min;
	}
	if (typeof(Storage) !== "undefined"){
		if (localStorage.getItem("filewindow") === null) {
			
		}else{
			$("<div>").addClass("document-parent").html(localStorage.getItem("filewindow")).appendTo("body");
  						$('.document').draggable();
			delegateTextarea();
			
		}
		if (localStorage.getItem("progress") === null) {
		  //...
		}else{
			if (localStorage.getItem("dontsave") == "true"){}else{
			$("#container").html(localStorage.getItem("progress"), function(){
				updateScroll();
				if (hasUploaded == true) {
					$("#container").append("<span class='cmd-cont'>File uploaded successfully.</span>");	
				}
				$('.msg').eq(1).remove();
				
			});
				if (localStorage.getItem("progress") == ""){
					$("#container").append("<span class='cmd-cont'>type 'help' to get a list of commands.</span>");
				}
				if ($('.msg').length){
					console.log("hmm");
					$(".msg").appendTo("#container");	
				$('.msg').slice(1).remove();
				}
			}
		}
		if (localStorage.getItem("name") === null) {
		  //...
		}else{
			if (localStorage.getItem("name") === ""){}else{
				$("#container").append("<span class='cmd-cont'>Welcome back, " + localStorage.getItem("name") + " <i>" + formatDate(new Date()) + "</i></span>");
			}
		}
	}
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("theme") === null) {
		  //...
		}else{
			var savedTheme = localStorage.getItem("theme");
			changeTheme(savedTheme);
		}
	}
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function updateScroll() {
	    
			findAllImages();
	  	if (typeof(Storage) !== "undefined") {
			if (localStorage.getItem("dontscroll") == "true"){
				
			}else{
	        	var element = document.getElementById("container");
	        	$('.wrapper').scrollTop($('.wrapper')[0].scrollHeight - $('.wrapper')[0].clientHeight);
	        	console.log("scroll");
			}
		}else{
        	var element = document.getElementById("container");
        	$('.wrapper').scrollTop($('.wrapper')[0].scrollHeight - $('.wrapper')[0].clientHeight);
        	console.log("scroll");
        }
    }
    var pushsNum;

    function convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }

    function copyToClipboard(text) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }

    $("#container").on("click", "a.upyes", function(e) {
        // Send upload 
        $(".uploadbox").hide();
        $(".fname").val(makeid() + "-" + convertToSlug($(".fname").val()));
        $("#container").append("<span class='code'>start upload? [yes]</span>");
        $("#container").append("<span class='cmd-cont'>loading...</span>");
        updateScroll();
        // DO UPLOAD HERE
        $(".submitbutton").click();
        $(".isup").val("fa");
        e.preventDefault;
        return false;
    });
    $("#container").on("click", "a.upno", function(e) {
        $("#container").append("<span class='code'>start upload? [no]</span>");
        updateScroll();
        $(".uploadbox").hide();
        $(".isup").val("fa");
        document.getElementById("fileupload").value = "";
        e.preventDefault;
        return false;
    });
    var fname;
    $("#input input").focus();
    $(".wrapper").click(function() {
        $("#input input").focus();
    });
    $('#cmd').bind("leftKey", function(e) {
        e.preventDefault;
        $("#cmd").val($(".lastcmd").val());
        return false;
    });
    $('#cmd').bind("rightKey", function(e) {
        e.preventDefault;
        $("#cmd").val("http://");
        return false;
    });
    $('#container').bind("tabKey", function(e) {
        e.preventDefault;
        $("*[tabindex='1']").focus();
        return false;
    });
    $("#fileupload").focus(function(e) {
        e.preventDefault;
        $("#container").focus();
        return false;
    });
    $('#fileupload').bind("tabKey", function(e) {
        e.preventDefault;
        $("*[tabindex='1']").focus();
        return false;
    });
		
    $('#cmd').bind("enterKey", function(e) {
        e.preventDefault();
				$(".loadingspin").attr("style", "display:block !important;");
        var value = $(this).val();
        pushsNum = 1;
        $(".lastcmd").val(value);
        $(this).val("");
        if (value.match("^setup dl") || value.match("^sd ")) {
            // if (value.indexOf('setup dl')){
            $("#fileupload").click();
            $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>please select a file...</span>");
            updateScroll();
            if (value == "setup dl" || value == "setup dl ") {} else {
                fname = value;
                fname = value.substr(9, 60);
                console.log("filename: " + fname);
                $(".fname").val(fname);
            }
        } else if (value.match("^help")) {
            $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>available functions: <br /><ul><li>setup dl <strong>filename</strong> <strong>/</strong> sd <strong>filename</strong></li><li>search <strong>filename</strong></li><li>theme <strong>themename</strong></li><li>clear<strong>/</strong>cls</li><li>gallery</li><li>list</li><li>help</li></ul></span><span class='cmd-cont'>available themes:<br /><ul><li>regular <strong>/</strong> reset <strong>/</strong> sl1ck</li><li>code <strong>/</strong> proj_code <strong>/</strong> pc</li><li>typewriter <strong>/</strong> tp <strong>/</strong> clean</li></ul>Press the up arrow to finish a command, press <strong>'</strong> to enter the last command<br />If a file is visible through search/list, then you can copy it's link with <ul><li>copy <strong>filename.ext</strong></li></ul> or open the link with <ul><li>go <strong>filename.ext</strong></li></ul>Press enter to scroll to the bottom of the page. You can also drag and drop files to upload. Type 'more' for more commands.</span>");
            updateScroll();
        } else if (value.match("^clear") || value.match("^cls")) {
            if ($(".isup").attr("value") == "tr") {
                $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>error: please answer yes/no first</span>");
                /*history.pushState(null, null, '/?' + pushsNum);
                pushsNum++;*/
                updateScroll();
            } else {
                $("#container").html("");
            }
        } else if (value.match("^rename ")) {
            if ($(".isup").attr("value") == "tr") {
                var newname = value.substr(7, 60);
                $(".fname").val(newname);
                $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>file renamed to <strong>" + newname + "</strong></span>");
                updateScroll();
            } else {
                $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>error: no file to rename</span>");
                updateScroll();
            }
        } else if (value.match("^yes")) {
            if ($(".isup").attr("value") == "tr") {
                $(".upyes").click();
            } else {
                var textArray = [
                    'uhm...',
                    'not sure what you are answering...',
                    'huh?'
                ];
                var randomNumber = Math.floor(Math.random() * textArray.length);
                $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>" + textArray[randomNumber] + "</span>");
                updateScroll();
            }

        } else if (value == "no") {
            if ($(".isup").attr("value") == "tr") {
                $(".upno").click();
            } else {
                var textArray = [
                    'uhm...',
                    'not sure what you are answering...',
                    'huh?'
                ];
                var randomNumber = Math.floor(Math.random() * textArray.length);
                $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>" + textArray[randomNumber] + "</span>");
                updateScroll();
            }
        } else if (value.match("^search ")) {
            $(".searchcont").hide();
            $("#container").append("<span class='code'>" + value + "</span>");
            $("#container").append($("<div class='searchcont'>").load("/list.php #listfileul", function() {
							var dasearch;
							if ((value.split(" ").length - 1) > 1){
							dasearch = value.substr(7).replace(' + ', '"), .searchcont li:contains("');
							}else{
	            dasearch = value.substr(7);
							}
                var foundLi = $('.searchcont li:contains("' + dasearch + '")');
                $(".searchcont li").hide();
                foundLi.show();
                $("#container").append("<span class='cmd-cont'>" + $(".searchcont li:visible").length + " result(s).</span>");
                updateScroll();
            }));
            updateScroll();
        } else if (value.match("^audio")) {
	        $(".audiodiv").remove();
            $("#container").append("<span class='code'>" + value + "</span>");
            $("#container").append($("<div class='audiodiv'>").load("/audio.php #audio", function(){
                updateScroll();
            }));
            updateScroll();
        } else if (value.match("^video")) {
	        $(".videodiv").remove();
            $("#container").append("<span class='code'>" + value + "</span>");
            $("#container").append($("<div class='videodiv'>").load("/video.php #video", function(){
                updateScroll();
            }));
            updateScroll();
        } else if (value.match("^gallery")) {
	        $(".gallerydiv").remove();
            $("#container").append("<span class='code'>" + value + "</span>");
            $("#container").append($("<div class='gallerydiv'>").load("/gallery.php #gallery", function(){
                updateScroll();
            }));
            updateScroll();
        } else if (value.match("^copy") && !value.match("^copy ")) {
            if (hasUploaded == true) {
                copyToClipboard($(".filelink").attr("href"));
            }
        } else if (value.match("^fname ")) {
            zeid = value.substr(5, 120) + "-" + Math.floor(Math.random() * 9999);
						$("#container").append("<span class='cmd-cont'>Set filename as " + zeid + "</span>");
        } else if (value.match("^go") && !value.match("^go ")) {
            if (hasUploaded == true) {
                window.location.href = $(".filelink").attr("href");
            }
        } else if (value.match("^go ")) {
            var openIs = value.substr(3, 80);
            var location = $(".listlink").filter(function() {
                return $(this).text() === openIs;
            }).attr("href");
            if (location != null) {
                var Location = document.location + location;
                window.location.href = location;
            }
        } else if (value.match("^new")) {
					var ffzename = value.substr(4, 120);
					if (ffzename || zeid){}else{
					zeid = value.substr(4, 120) + "-" + Math.floor(Math.random() * 9999);}
							if ($(".document-parent").length){
								$("#container").append("<span class='cmd-code'>Please <a href='#' onClick='doCloseDoc()' style='display:inline-block;padding:0 2px;background:#333;color:#eee;' >close</a> your existing document first");
							}else{
$('<div class="document-parent">  \
<div class="document"> \
<header> \
<span class="closedocument"> \
<a href="#" onClick="doCloseDoc()" title="Discard changes & close"><i class="fa fa-window-close"></i></a> <a href="#" title="Save & upload" onClick="uploadHTMLFile()"><i class="fa fa-floppy-o"></i></a> <a href="#" title="Rename" onClick="enterRenameText()"><i class="fa fa-commenting-o"></i></a> \
<a href="#" title="Console" onClick="showConsole()" class="changetocons"><i class="fa fa-play"></i></a> \
</span> \
</header> \
<textarea id="zanotes"><!--<body>-->\n\
ctrl+s to save   \n\
closing this box will discard your progress\n\
<!--</body>--></textarea><canvas id="c" style="min-width: 377px;"></canvas><div class="output-js"><input type="text" id="jsconsole" /></div> \
</div> \
</div>').appendTo("body");
								delegateTextarea();
  						$('.document').draggable();
								$("#container").append("<span class='cmd-cont'>Opened new document</span>");
							$(".document textarea").focus();
								$("#jsconsole").bind("enterKey", function(e) {
			e.preventDefault();
      var consvalue = $(this).val();
			$(".output-js").append(consvalue + "<br />");
			eval(consvalue);
		});
							}
				}else if (value.match("^copy ")) {
            var copyIs = value.substr(5, 80);
            var copyLocation = $(".listlink").filter(function() {
                return $(this).text() === copyIs;
            }).attr("href");
            if (copyLocation != null) {
                var copyLocation = document.location + copyLocation;
                copyToClipboard(copyLocation);
            }
        }else if (value.match("^matrix")) {
            matrix();
        } else if (value.match("^list")) {
            $("#container").find("#listfileul").hide();
            $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>loading all files...<br /><strong>press tab to browse files</strong></span>");
            $("#container").append($("<div>").load("/list.php #listfileul", function(){
                updateScroll();
            }));
            $("#container").append("<span class='cmd-cont'>files loaded</span>");
            updateScroll();
        } else if (value.match("^set ")){
	        var str = value;
	        var index = str.indexOf(' ', str.indexOf(' ') + 1);
			var stringValue = str.substr(index + 1);
			var firstChunk = str.substr( 0, index );
	        var stringName = firstChunk.substr(4);
	        if (stringName == ""){
				$("#container").append("<span class='cmd-cont'>error: set needs 2 parameters</span>");
	        }else{
	        if (typeof(Storage) !== "undefined") {
			    // Store
			    localStorage.setItem(stringName, stringValue);
			    if (stringName == "theme"){
				    changeTheme(stringValue);
			    }
			}
				$("#container").append("<span class='cmd-cont'>set " + stringName + " as '" + stringValue + "'</span>");
			}
	    } else if (value.match("^show ")){
			$("#container").append("<span class='cmd-cont'>" + localStorage.getItem(value.substr(5)) + "</span>");
			updateScroll();
		} else if (value.match("^theme ")){
            var themeIs = value.substr(6, 100);
	        if (typeof(Storage) !== "undefined") {
			    // Store
			    localStorage.setItem("theme", themeIs);
			}
			changeTheme(themeIs);
	  } else if (value.match("^note")) {
            var noteName = value.substr(5);
						var appendDiv;
						if (noteName == ""){
							var howManyNotes = $(".note:visible").length;
							if (howManyNotes == 1 || howManyNotes == "1"){
							appendDiv = '<div class="note" contenteditable="true" notename="1"><span>Note #1</span><p>Press tab to navigate to note...</p></div>';
							}
							appendDiv = '<div class="note" contenteditable="true" notename="'+ howManyNotes +'"><span>Note #' + howManyNotes + '</span><p>Press tab to navigate to note...</p></div>';
						}else{
							appendDiv = '<div class="note" contenteditable="true" notename="' + noteName + '"><span>' + noteName + '</span><p>Press tab to navigate to note...</p></div>';
						}
						$("#container").append(appendDiv);
		} else if (value.match("^edit ")) {
            var editDiv = value.substr(5);
						$('.note[notename="' + editDiv + '"]').children("p").focus();
						console.log('.note[notename="' + editDiv + '"]');
		} else if (value.match("^reset")) {
            localStorage.clear();
            $("#container").append("localstorage cleared");
		} else if (value.match("^echo ")) {
            var textIs = value.substr(5, 100);
            $("#container").append("<span class='cmd-cont echo'>" + textIs + "</span>");
		} else if (value.match("^/r/")){
            window.open("http://reddit.com" + value, '_blank');
		} else if (value.match("^http://") || value.match("^https://")) {
            window.open(value, '_blank');
		} else if (value.match("^focus")) {
            if ($(".listlink").length) {
                $('.listlink[tabindex="1"]').focus();
            }
        } else if (value.match("^more")) {
            $("#container").append('<span class="cmd-cont">more commands:<ul><li>video</li><li>audio</li><li>set <strong>name</strong> <strong>value</strong></li><li>/r/<strong>subreddit</strong></li><li>http://<strong>url</strong></li><li>echo <strong>text</strong> (HTML allowed)</li><li>show <strong>name</strong></li></ul>Use "set" to create variables, press alt-key to type "http://". Variables that effect the page are:<ul><li>name</li><li>dontsave</li></ul>You can use "set dontsave true" to stop localstorage saving of your progress.</span>');
            updateScroll();
        } else if (value == "") {
            updateScroll();
						$(".loadingspin").hide();
        }
			setTimeout(function(){
				$(".loadingspin").hide();
			}, 100);
        return false;
    });
    $('#cmd').keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        } else if (e.keyCode == 222) {
            $(this).trigger("leftKey");
            e.preventDefault();
        } else if (e.keyCode == 9) {
            $(this).trigger("tabKey");
            e.preventDefault();
        } else if (e.keyCode == 18) {
            $(this).trigger("rightKey");
            e.preventDefault();
        }
    });
    $(function() {
        $("input:file").change(function() {
            $(".isup").val("tr");
            var abc;
            var fileName = $(this).val();
            fileName = fileName.substr(12, 60);
            fileName = fileName.substring(0, fileName.indexOf('.'));
            if ($(".fname").val() == "") {
                var fname = fileName;
                $(".fname").val(fileName);
                abc = "";
            } else {
                var fname = $(".fname").val();
                abc = "";
            }
            $("#container").append("<span class='cmd-cont'>file <strong>" + fileName + "</strong> selected. " + abc + "<br /><div class='dialogbox uploadbox'><i>do you want to start the upload?</i><br /><a href='#yes' class='upyes'>Yes</a> <a class='upno' href='#no'>No</a></span></div><div class='cmd-cont'>to rename the file, use the 'rename <strong>new name</strong>' command.</div>");
            $("#container").append("<span class='cmd-cont'>current filename is: <strong>" + fname + "</strong></span>");
            updateScroll();
        });
    });
    $("#container").on("click", ".openimgl", function() {
        if ($(this).text() == "(embed)") {
            $("<div class='imgpreview' data-refimg='" + $(this).data("imglink") + "'><img src='" + $(this).data("imglink") + "' /></div>").appendTo($(this).parent("li"));
            $(this).text("close");
        } else {
            $(".imgpreview[data-refimg='" + $(this).data("imglink") + "']").remove();
            $(this).text("(embed)");
        }
    });
		$("body").on("click", ".document span a", function(){
				$(this).parent(".document-parent").remove();
		});
    $("#container").on("click", ".openvidl", function() {
        if ($(this).text() == "(embed)") {
            $("<div class='vidpreview' data-refvid='" + $(this).data("vidlink") + "'><video preload='none' src='" + $(this).data("vidlink") + "' controls /></div>").appendTo($(this).parent("li"));
            $(this).text("close");
        } else {
            $(".vidpreview[data-refvid='" + $(this).data("vidlink") + "']").remove();
            $(this).text("(embed)");
        }
    });
    $("#container").on("click", ".openaudl", function() {
        if ($(this).text() == "(embed)") {
            $("<div class='audpreview' data-refaud='" + $(this).data("audlink") + "'><audio preload='none' src='" + $(this).data("audlink") + "' controls /></div>").appendTo($(this).parent("li"));
            $(this).text("close");
        } else {
            $(".audpreview[data-refaud='" + $(this).data("audlink") + "']").remove();
            $(this).text("(embed)");
        }
    });
    $("#container").on("click", ".galleryimg", function() {
        window.open($(this).attr("src"), '_blank');
    });
	var hasDoneMatrix = false;
	
	function matrix(){
		if (hasDoneMatrix === false){
						$("#c").fadeIn(100);
						$("#zanotes").fadeOut(200);
						$(".output-js").fadeOut(200);
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
//converting the string into an array of single characters
chinese = chinese.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = 1; 

//drawing the characters
function draw()
{
	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);
	
	ctx.fillStyle = "#0F0"; //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{
		//a random chinese character to print
		var text = chinese[Math.floor(Math.random()*chinese.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size);
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size > c.height && Math.random() > 0.975)
			drops[i] = 0;
		
		//incrementing Y coordinate
		drops[i]++;
	}
}
hasDoneMatrix = true;
setInterval(draw, 33);
		}else{
			$("#c").hide();
			$("#zanotes").show();
		}
		hasDoneMatrix = true;
	}



	
	
	
}); /* DOCUMENT-READY */
$(function() {
    var availableTags = [
        "setup dl ",
        "theme ",
        "help",
        "echo ",
        "clear",
        "rename ",
        "search ",
        "list",
        "go",
        "gallery",
        "video",
        "audio",
        "copy",
        "yes",
        "no"
    ];
    $("#cmd").autocomplete({
        source: availableTags
    });
});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
$(".clbx").click(function(){
	$(this).parent("div").remove();
	history.pushState('data', '', '/?k=' + getUrlParameter("k"));
});
function doCloseDoc(){
	$("<div class='confirm'>Closing this will delete all data inside - please confirm.<br /><a href='#' id='closebut' onClick='reallyCloseDoc()'>Close</a> <a href='#' onClick='cancelCloseDoc()'>Cancel</a></div>").appendTo("body");
	setTimeout(function(){
		$("#closebut").focus();
	}, 100);
}
function reallyCloseDoc(){
	$(".document-parent").remove();
	localStorage.removeItem("filewindow");
	$(".confirm").remove();
	$("#cmd").focus();
}
function cancelCloseDoc(){
	$(".confirm").remove();
	$("#zanotes").focus();
}
function uploadHTMLFile(){
	if ($(".document-parent").length){
    	$("#container").append("<span class='cmd-code'>Creating file...</span>");
			var data = new FormData();
			var zetext = $("#zanotes").val();
			data.append("data" , zetext);
			if (zeid || zeid != ""){}else{
				zeid = Math.random() * 99999;
			}
			data.append("filename" , zeid);
			var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
			xhr.open( 'post', '/path/to/php.php', true );
			xhr.send(data);
			$("#container").append("<span class='cmd-cont'>File uploaded as <a href='/path/to/upload/" + zeid + ".html'>" + zeid + "</a></span>");
		}else{
    		$("#container").append("<span class='cmd-cont'>Type 'new' to start writing your file</span>");
		}
		updateScroll();
}
function enterRenameText(){
	/*$("#cmd").val("fname new-filename-here");*/
	var tempzeid = prompt("New name");
	if (tempzeid === "") {
    // user pressed OK, but the input field was empty
	} else if (tempzeid) {
			zeid = tempzeid + "-" + Math.floor(Math.random() * 99999);
		$("#container").append("<span class='cmd-cont'>Set filename as " + zeid);
	} else {
			// user hit cancel
	}
	updateScroll();
	$("#cmd").focus();
}function showConsole(){
		if ($(".changetocons").children("i").hasClass("fa-play")){
			$(".output-js").show();
			$("#c").hide();
			$("#zanotes").hide();
			$(".changetocons").children("i").removeClass("fa-play").addClass("fa-chevron-circle-left");
		}else{
			$(".output-js").hide();
			$("#c").hide();
			$("#zanotes").show();
			$(".changetocons").children("i").removeClass("fa-chevron-circle-left").addClass("fa-play");
		}
	}
function delegateTextarea(){
	$(document).delegate('#zanotes', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = $(this).get(0).selectionStart;
    var end = $(this).get(0).selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "   "
                + $(this).val().substring(end));

    // put caret at right position again
    $(this).get(0).selectionStart =
    $(this).get(0).selectionEnd = start + 1;
  }
});
}
function openNew(){
			if ($(".document-parent").length){
								$("#container").append("<span class='cmd-code'>Please <a href='#' onClick='doCloseDoc()' style='display:inline-block;padding:0 2px;background:#333;color:#eee;' >close</a> your existing document first");
							}else{
$('<div class="document-parent">  \
<div class="document"> \
<header> \
<span class="closedocument"> \
<a href="#" onClick="doCloseDoc()" title="Discard changes & close"><i class="fa fa-window-close"></i></a> <a href="#" title="Save & upload" onClick="uploadHTMLFile()"><i class="fa fa-floppy-o"></i></a> <a href="#" title="Rename" onClick="enterRenameText()"><i class="fa fa-commenting-o"></i></a> \
<a href="#" title="Console" onClick="showConsole()" class="changetocons"><i class="fa fa-play"></i></a> \
</span> \
</header> \
<textarea id="zanotes"><!--<body>-->\n\
ctrl+s to save   \n\
closing this box will discard your progress\n\
<!--</body>--></textarea><canvas id="c" style="min-width: 377px;"></canvas><div class="output-js"><input type="text" id="jsconsole" /></div> \
</div> \
</div>').appendTo("body");
								delegateTextarea();
  						$('.document').draggable();
								$("#container").append("<span class='cmd-cont'>Opened new document</span>");
							$(".document textarea").focus();
								$("#jsconsole").bind("enterKey", function(e) {
			e.preventDefault();
      var consvalue = $(this).val();
			$(".output-js").append(consvalue + "<br />");
			eval(consvalue);
		});
							}
}
function changeSave(){
	if (localStorage.getItem("dontsave") == "true"){
		localStorage.setItem("dontsave", "false");
	}else{
		localStorage.setItem("dontsave", "false");
	}
}
$('.doSaveCheckbox').change(function() {
        if($(this).is(":checked")) {
					localStorage.setItem("dontsave", "false");
        }else{
					localStorage.setItem("dontsave", "true");
					localStorage.removeItem("progress");
				}
});
$(window).keypress(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
		uploadHTMLFile();
    event.preventDefault();
    return false;
});