"use strict";
let prevCode = "";
window.addEventListener("load", function () {
    document.getElementById("button_auto").disabled = true;
    document.getElementById("button_step").disabled = true;
    document.getElementById("button_reset").disabled = true;
    document.getElementById("code_textarea").value = "print('Hello World!');";
    setInterval(function () {
        if (isAuto) {
            isAuto = step();
        }
    }, 60);
    setInterval(function () {
        if (prevCode != getCode()) {
            addLog("change");
            prevCode = getCode();
        }
    }, 1000);
    window.onbeforeunload = function (e) {
        if (isAddedLog) {
            e.returnValue = "活動記録がファイルに出力されていません。ページを閉じますか？";
        }
    }
    addLog("load");
})
