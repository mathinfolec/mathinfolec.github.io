window.addEventListener("load", function () {
    createjs.Ticker.addEventListener("tick", function () {
        if (phase == 2) {
            if (0 <= movingPointId && movingPointId < points.length) {
                let x = stage.mouseX;
                let y = stage.mouseY;
                if (minX < x && x < maxX && minY < y && y < maxY) {
                    let p = points[movingPointId];
                    p.obj.x = x;
                    p.obj.y = y;
                    p.text.x = x;
                    p.text.y = y;
                }
                drawLine();
            }
        }
        stage.update();
    });
});