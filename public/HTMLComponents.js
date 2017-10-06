var HTMLComponents = function() {
    var copy_url_container = document.getElementById('copy_url');
    var url_textbox = document.getElementById("url");
    var copy_button = document.getElementById("copy_button");
    var url_text = document.getElementById("url_text");
    var reset_container = document.getElementById("reset");
    var reset_button = document.getElementById("reset_button");
    var game_result_text = document.getElementById("game_result_text");

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

    // Function to show or hide the reset button
    this.showResetGameButton = function(show) {
        if(show) {
            reset_container.style.display = "flex";
            //reset_button.setAttribute("style", "display: flex;");
        }
        else {
            reset_container.style.display = "none";
            //reset_button.setAttribute("style", "display: none;");
        }
    }

    // Function to show or hide the reset button
    this.showGameResultText = function(show) {
        if(show == 1) {
            //game_result_text.style.display = "flex";
            //game_result_text.setAttribute("style", "display: flex;");
        }
        else if (show == 2) {
            game_result_text.innerHTML = "You lose";
            //game_result_text.style.display = "flex";
            //game_result_text.setAttribute("style", "display: flex;");
        }
        else {
            //game_result_text.style.display = "none";
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
        var resultTextWidthScale, resultTextFontScale;
        //var resetButtonWidthScale, resetButtonFontScale, resetButtonMarginTop, resetButtonPadding;

        urlTextWidthScale = boardCoordinates.width;
        urlTextFontScale = urlTextWidthScale * 0.05;

        urlTextBoxWidthScale = boardCoordinates.width * 0.50;
        urlTextBoxFontScale = urlTextBoxWidthScale * 0.04;
        urlTextBoxMarginTop = boardCoordinates.width * 0.025;
        
        copyWidthScale = boardCoordinates.width * 0.25;
        copyFontScale = copyWidthScale * 0.1;
        copyMarginTop = boardCoordinates.width * 0.025;
        copyPadding = boardCoordinates.width * 0.02;

        // resultTextWidthScale = boardCoordinates.width;
        // resultTextFontScale = resultTextWidthScale * 0.05;

        // resetButtonWidthScale = boardCoordinates.width * 0.25;
        // resetButtonFontScale = resetButtonWidthScale * 0.1;
        // resetButtonMarginTop = boardCoordinates.width * 0.025;
        // resetButtonPadding = boardCoordinates.width * 0.02;

        url_text.setAttribute("style","width: " + urlTextWidthScale + "px; font-size: " + urlTextFontScale + "px;"); 
        url_textbox.setAttribute("style","width: " + urlTextBoxWidthScale + "px; font-size: "+urlTextBoxFontScale + "px;"
        + "margin-top: " + urlTextBoxMarginTop + "px;"); 
        copy_button.setAttribute("style","width: " + copyWidthScale+ "px; font-size: " + copyFontScale + "px; margin-top: " 
        + copyMarginTop + "px; padding: " + copyPadding + "px;"); 

        // game_result_text.style.width = urlTextBoxWidthScale;
        // game_result_text.style.fontSize = urlTextBoxFontScale;
        
        // reset_button.style.width = copyWidthScale;
        // reset_button.style.fontSize = copyFontScale;
        // reset_button.style.marginTop = copyMarginScale;
        // reset_button.style.padding = copyPadding;

        game_result_text.setAttribute("style","width: " + urlTextWidthScale + "px; font-size: " + urlTextFontScale + "px;");
        reset_button.setAttribute("style","width: " + copyWidthScale+ "px; font-size: " + copyFontScale + "px; margin-top: " 
        + copyMarginTop + "px; padding: " + copyPadding + "px;"); 

        //game_result_text.setAttribute("style","width: " + resultTextWidthScale + "px; font-size: " + resultTextFontScale + "px;");
        //reset_button.setAttribute("style","width: " + resetButtonWidthScale+ "px; font-size: " + resetButtonFontScale + "px; margin-top: " 
        //+ resetButtonMarginTop + "px; padding: " + resetButtonPadding + "px;"); 
    }
}