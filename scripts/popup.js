let popup = document.getElementById("myPopup");
let closeBtn = document.getElementsByClassName("close")[0];
let content = document.getElementsByClassName("popupContent");
let contentText = document.getElementById("popupText");

function alertPopup (text, variable) {
    contentText.innerHTML = text + "<span class=\"variable\">" + variable + "</span>";
    popup.style.display = "block";
}

// Close popup whenever the user clicks the x button
closeBtn.onclick = function () {
        popup.style.display = "none";
}

// Close popup when the user clicks outside of the popup
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none"
    }
}