"use strict";
window.addEventListener("load", function () {
    document.getElementById("button_auto").disabled = true;
    document.getElementById("button_step").disabled = true;
    document.getElementById("button_reset").disabled = true;
    document.getElementById("code_textarea").value = "print('Hello World!');";
    setInterval(function () {
        if (isAuto) {
            isAuto = step();
        }
    }, 50);
})
