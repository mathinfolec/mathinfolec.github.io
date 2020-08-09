const showTextArea = function () {
    document.getElementById("ta_code").style.display = "block";
    document.getElementById("button_conv").style.display = "inline-block";
    document.getElementById("ta_open").style.display = "none";
    document.getElementById("code_out").style.display = "none";
    reqConv();
}
const hideTextArea = function () {
    document.getElementById("ta_code").style.display = "none";
    document.getElementById("button_conv").style.display = "none";
    document.getElementById("ta_open").style.display = "inline-block";
    document.getElementById("code_out").style.display = "block";
}