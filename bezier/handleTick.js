window.addEventListener("load", function () {
    createjs.Ticker.addEventListener("tick", function () {
        if (phase == "animate" && isTicking) {
            if (interval > 0) interval--;
            else {
                count++;
                if (count % divFreq == 0) {
                    curDiv++;
                    curDiv %= (maxDiv + 1);
                    t = curDiv / maxDiv;
                    calc();
                }
            }
        }
        stage.update();
    });
});