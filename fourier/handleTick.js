window.addEventListener("load", function () {
    createjs.Ticker.addEventListener("tick", function () {
        if (isTicking) {
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