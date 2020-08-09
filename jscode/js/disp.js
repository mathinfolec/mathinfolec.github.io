const showTextArea = function () {
    document.getElementById("ta-code").style.display = "block";
    document.getElementById("button_conv").style.display = "inline-block";
    document.getElementById("ta-open").style.display = "none";
}
const hideTextArea = function () {
    document.getElementById("ta-code").style.display = "none";
    document.getElementById("button_conv").style.display = "none";
    document.getElementById("ta-open").style.display = "inline-block";
}