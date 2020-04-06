window.addEventListener("load", function () {
    stage.addEventListener("mousedown", function () {
        let x = stage.mouseX;
        let y = stage.mouseY;
        for (let i = 0; i < buttons.length; i++) {
            let b = buttons[i].obj;
            if (b.x < x && x < b.x + buttonX && b.y < y && y < b.y + buttonY) {
                phase = i;
                console.log("phase: " + phaseStrs[i]);
                highlightButton();
                p0Id = -1;
                movingPointId = -1;
                break;
            }
        }
        if (phase == 0) addPoint(x, y);
        if (phase == 1) setLine(x, y);
        if (phase == 2) movePoint(x, y);
        if (phase == 3) dividePoint(x, y);
        if (phase == 4) removePoint(x, y);
    });
});