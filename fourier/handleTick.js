window.addEventListener("load", function () {
    createjs.Ticker.addEventListener("tick", function () {
        if (phase == "init") {
            let x = stage.mouseX;
            let y = stage.mouseY;
            //console.log(x + "," + y);
            if (0 < x && x < 50 && 0 < y && y < 500) {
                phase = "draw";
                startDraw();
            }
        }
        else if (phase == "draw") {
            let x = stage.mouseX;
            let y = stage.mouseY;
            if (curX < x) {
                if (freeXArr.length == 0) {
                    curY = y;
                    freeXArr.push(convertCalcX(curX));
                    freeYArr.push(convertCalcY(curY));
                }
                if (maxX <= x) x = maxX;
                freeXArr.push(convertCalcX(x));
                freeYArr.push(convertCalcY(y));
                freeLine.graphics.moveTo(curX, curY)
                    .lineTo(x, y);
                //console.log("lineto: " + x + "," + y);
                curX = x;
                curY = y;


                if (maxX <= x) {
                    phase = "calc";
                    console.log("calc");
                    calcAB();
                }
            }
        }
        if (phase == "animate" && isTicking) {
            count++;
            if (interval > 0) interval--;
            else {
                if (count % moveFreq == 0 && isMoving) {
                    moveLine();
                }
                else if (count % degFreq == 0 && !isMoving) {
                    degUp();
                }
            }
        }
        stage.update();
    });
});