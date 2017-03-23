$(document).on('dragover', '.wrapper', function(e) {
    e.preventDefault();
    $("#fileupload").addClass('ishovered');
    $(".dragtext").show();
});
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
$(document).ready(function() {
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function updateScroll() {
        var element = document.getElementById("container");
        element.scrollTop = element.scrollHeight;
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
        var value = $(this).val();
        pushsNum = 1;
        $(".lastcmd").val(value);
        $(this).val("");
        if (value.match("^setup dl")) {
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
            $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>available functions: <br /><ul><li>setup dl <strong>filename</strong></li><li>search <strong>filename</strong></li><li>clear<strong>/</strong>cls</li><li>list</li><li>help</li></ul>Press the up arrow to finish a command, press <strong>'</strong> to enter the last command<br />If a file is visible through search/list, then you can copy it's link with <ul><li>copy <strong>filename.ext</strong></li></ul> or open the link with <ul><li>go <strong>filename.ext</strong></li></ul>Press enter to scroll to the bottom of the page. You can also drag and drop files to upload.</span>");
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

        } else if (value.match("^no")) {
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
                var foundLi = $('.searchcont li:contains("' + value.substr(7, 80) + '")');
                $(".searchcont li").hide();
                foundLi.show();
                updateScroll();
                $("#container").append("<span class='cmd-cont'>" + $(".searchcont li:visible").length + " result(s).</span>");
            }));
            updateScroll();
        } else if (value.match("^copy") && !value.match("^copy ")) {
            if (hasUploaded == true) {
                copyToClipboard($(".filelink").attr("href"));
            }
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
                var Location = "http://cmd.underbakke.net" + location;
                window.location.href = location;
            }
        } else if (value.match("^copy ")) {
            var copyIs = value.substr(5, 80);
            var copyLocation = $(".listlink").filter(function() {
                return $(this).text() === copyIs;
            }).attr("href");
            if (copyLocation != null) {
                var copyLocation = "http://cmd.underbakke.net" + copyLocation;
                copyToClipboard(copyLocation);
            }
        } else if (value.match("^list")) {
            $("#container").find("#listfileul").hide();
            $("#container").append("<span class='code'>" + value + "</span><span class='cmd-cont'>loading all files...<br /><strong>press tab to browse files</strong></span>");
            $("#container").append($("<div>").load("/list.php #listfileul"));
            $("#container").append("<span class='cmd-cont'>files loaded</span>");
            updateScroll();
        } else if (value.match("^focus")) {
            if ($(".listlink").length) {
                $('.listlink[tabindex="1"]').focus();
            }
        } else if (value == "") {
            updateScroll();
        }
        return false;
    });
    $('#cmd').keyup(function(e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        } else if (e.keyCode == 222) {
            $(this).trigger("leftKey");
        } else if (e.keyCode == 9) {
            $(this).trigger("tabKey");
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
    $("#container").on("click", ".openvidl", function() {
        if ($(this).text() == "(embed)") {
            $("<div class='vidpreview' data-refvid='" + $(this).data("vidlink") + "'><video src='" + $(this).data("vidlink") + "' controls /></div>").appendTo($(this).parent("li"));
            $(this).text("close");
        } else {
            $(".vidpreview[data-refvid='" + $(this).data("vidlink") + "']").remove();
            $(this).text("(embed)");
        }
    });
    $("#container").on("click", ".openaudl", function() {
        if ($(this).text() == "(embed)") {
            $("<div class='audpreview' data-refaud='" + $(this).data("audlink") + "'><audio src='" + $(this).data("audlink") + "' controls /></div>").appendTo($(this).parent("li"));
            $(this).text("close");
        } else {
            $(".audpreview[data-refaud='" + $(this).data("audlink") + "']").remove();
            $(this).text("(embed)");
        }
    });
});
$(function() {
    var availableTags = [
        "setup dl ",
        "help",
        "echo ",
        "clear",
        "cls",
        "rename ",
        "search ",
        "list",
        "go",
        "copy",
        "yes",
        "no"
    ];
    $("#cmd").autocomplete({
        source: availableTags
    });
});
