const getCodeLineDivId = function (id) {
    return "code" + id;
}
const reqConv = function () {
    document.getElementById("button_auto").disabled = true;
    document.getElementById("button_step").disabled = true;
    document.getElementById("button_reset").disabled = true;
}
const highlight = function (id) {
    for (let i = 0; i < flow.length; ++i) {
        document.getElementById(getCodeLineDivId(i)).style.color = (i == id ? "red" : "black");
    }
}
