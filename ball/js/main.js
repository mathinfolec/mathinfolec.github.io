let errorMes = null;
let logInterval = 0;
const defLogInterval = 20;
let initCodeStr = "";
let tickCodeStr = "";
let prevInitCodeStr = "";
let prevTickCodeStr = "";
window.addEventListener("load", function () {
    setup();
    window.onbeforeunload = function (e) {
        if (isAddedLog) {
            e.returnValue = "活動記録がファイルに出力されていません。ページを閉じますか？";
        }
    }
    createjs.Ticker.addEventListener("tick", function () {
        stage.update();
        if (errorMes != null) {
            window.alert(errorMes);
            errorMes = null;
            stop();
        }
        let curInitCodeStr = getCodeInitId().value;
        let curTickCodeStr = getCodeTickId().value;
        if (initCodeStr != curInitCodeStr || tickCodeStr != curTickCodeStr) {
            initCodeStr = curInitCodeStr;
            tickCodeStr = curTickCodeStr;
            getButtonTickId().disabled = true;
        }
        if (isTick) {
            try {
                resetTexts();
                let f = getTickFunc(getCodeTickId().value);
                f();
                cnt++;
            } catch (e) {
                errorMes = e;
                if (e instanceof Error) {
                    addLog("error_tick");
                }
                else {
                    addLog("exit_tick");
                }
            }
        }
        else {
            if (logInterval <= 0) {
                if (curInitCodeStr != prevInitCodeStr || curTickCodeStr != prevTickCodeStr) {
                    addLog("update");
                    prevInitCodeStr = curInitCodeStr;
                    prevTickCodeStr = curTickCodeStr;
                    logInterval = defLogInterval;
                }
            }
            else {
                logInterval--;
            }
        }
    });
});