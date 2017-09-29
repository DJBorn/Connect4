var HTMLComponents = function() {
    var copy_url_container = document.getElementById('copy_url');
    var url_textbox = document.getElementById("url");
    var copy_button = document.getElementById("copy_button");
    var url_text = document.getElementById("url_text");

    url_textbox.value = window.location.href;

    // Run when the 'Copy URL' button is pressed
    this.copyURL = function () {
        // Highlight and copy the URL in the textbox
        url_textbox.value = window.location.href;
        url_textbox.focus();
        url_textbox.setSelectionRange(0, window.location.href.length);
        document.execCommand('copy');
    
        // Change the button to notify the user the button has been pressed
        copy_button.innerHTML = "URL Copied";
        copy_button.style.color = "#473F42"
        copy_button.style["background-color"] = "white";
        setTimeout(function() {
            copy_button.innerHTML = "Copy URL";
            copy_button.style.color = "white"
            copy_button.style["background-color"] = "#473F42";
        }, 2000);
    }

    // Function to show or hide the Copy URL section
    this.showCopyURL = function(show) {
        if(show) {
            copy_url_container.setAttribute("style", "display: flex;");
        }
        else {
            copy_url_container.setAttribute("style", "display: none;");
        }
    }

    // Resize the HTML components given the board coordinates
    // @input obj -> {x, y, width, height}
    this.resizeComponents = function(boardCoordinates) {
        // Below are class variables that contain the elements that compose the share URL message
        // url_text -> Element of the text shown to user to copy and share ("Share your URL with your friend to play")
        // url_textbox -> Element that contains the actual URL ("http://locahost/fkasjlf")
        // copy_button -> Element that contains the copy button [Copy URL]
        var urlTextWidthScale, urlTextFontScale;
        var urlTextBoxWidthScale, urlTextBoxFontScale, urlTextBoxMarginTop;
        var copyWidthScale, copyFontScale, copyMarginTop, copyPadding;

        urlTextWidthScale = boardCoordinates.width;
        urlTextFontScale = urlTextWidthScale* 0.05;

        urlTextBoxWidthScale = boardCoordinates.width * 0.50;
        urlTextBoxFontScale = urlTextBoxWidthScale * 0.04;
        urlTextBoxMarginTop = boardCoordinates.width * 0.025;
        
        copyWidthScale = boardCoordinates.width * 0.25;
        copyFontScale = copyWidthScale* 0.1;
        copyMarginTop = boardCoordinates.width * 0.025;
        copyPadding = boardCoordinates.width * 0.02;

        url_text.setAttribute("style","width: " + urlTextWidthScale + "px; font-size: " + urlTextFontScale + "px;"); 
        url_textbox.setAttribute("style","width: " + urlTextBoxWidthScale + "px; font-size: "+urlTextBoxFontScale + "px;"
        + "margin-top: " + urlTextBoxMarginTop + "px;"); 
        copy_button.setAttribute("style","width: " + copyWidthScale+ "px; font-size: " + copyFontScale + "px; margin-top: " 
        + copyMarginTop + "px; padding: " + copyPadding + "px;"); 
    }
}