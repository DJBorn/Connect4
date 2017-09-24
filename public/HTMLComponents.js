var HTMLComponents = function() {
    document.getElementById("url").value = window.location.href;

    this.copyURL = function () {
        document.getElementById("url").value = window.location.href;
        var input = document.getElementById("url");
        input.focus();
        input.setSelectionRange(0, window.location.href.length);
        document.execCommand('copy');
    
        document.getElementById("copy_button").innerHTML = "URL Copied";
        document.getElementById("copy_button").setAttribute("style", "color: #473F42; background-color: white");
        setTimeout(function() {
            document.getElementById("copy_button").innerHTML = "Copy URL";
            document.getElementById("copy_button").setAttribute("style", "color: white; background-color: #473F42");
        }, 2000);
    }

    this.showCopyURL = function(show) {
        if(show) {
            document.getElementById('copy_url').setAttribute("style", "display: flex;");
        }
        else {
            document.getElementById('copy_url').setAttribute("style", "display: none;");
        }
    }
}