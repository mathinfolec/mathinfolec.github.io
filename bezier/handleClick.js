window.addEventListener("load", function () {
    stage.addEventListener("mousedown", function () {
        if (phase == "click") addPoint(stage.mouseX, stage.mouseY);
    });
});