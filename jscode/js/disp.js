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
const showToc = function () {
    document.getElementById("toc_ol").style.display = "block";
    document.getElementById("toc_open").style.display = "none";
    document.getElementById("toc_close").style.display = "inline-block";
}
const hideToc = function () {
    document.getElementById("toc_ol").style.display = "none";
    document.getElementById("toc_open").style.display = "inline-block";
    document.getElementById("toc_close").style.display = "none";
}
const showOpt = function () {
    document.getElementById("opt_ul").style.display = "block";
    document.getElementById("opt_open").style.display = "none";
    document.getElementById("opt_close").style.display = "inline-block";
}
const hideOpt = function () {
    document.getElementById("opt_ul").style.display = "none";
    document.getElementById("opt_open").style.display = "inline-block";
    document.getElementById("opt_close").style.display = "none";
}