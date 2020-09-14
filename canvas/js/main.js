window.addEventListener("load", function () {
    setup();
    document.getElementById("lastmodified").innerHTML = document.lastModified;
    document.getElementById("import").addEventListener("change", function (e) {
        try {
            let fs = e.target.files;
            let reader = new FileReader();
            reader.readAsText(fs[0]);
            reader.onload = function () {
                let str = reader.result;
                console.log(str);
                if (window.confirm("ログファイルを読み込みますか？ 現時点でシミュレータ上に書かれたコードはすべて上書きされます。")) {
                    let f0str = "'use strict';let id,logs,codes;";
                    let f1str = "importSlot(codes);";
                    let func = Function(f0str + str + f1str);
                    func();
                    addLog("import");
                }
            }
        } catch (e) {
            window.alert(e);
        }
    });
    window.onbeforeunload = function (e) {
        if (isAddedLog) {
            e.returnValue = "活動記録がファイルに出力されていません。ページを閉じますか？";
        }
    }
    window.onkeydown = function (e) {
        if (isTick) {
            let code = e.keyCode;
            switch (code) {
                case 32:
                case 37:
                case 38:
                case 39:
                case 40:
                    e.preventDefault();
                    break;
            }
            keyList[code] = true;
        }
    }
    window.onkeyup = function (e) {
        if (isTick) {
            let code = e.keyCode;
            switch (code) {
                case 32:
                case 37:
                case 38:
                case 39:
                case 40:
                    e.preventDefault();
                    break;
            }
            keyList[code] = false;
        }
    }
    createjs.Ticker.framerate = FPS;
    createjs.Ticker.addEventListener("tick", function () {
        if (errorMes != null) {
            window.alert(errorMes);
            errorMes = null;
            stop(true);
        }
        let curInitCodeStr = getCodeInitId().value;
        let curTickCodeStr = getCodeTickId().value;
        if (initCodeStr != curInitCodeStr || tickCodeStr != curTickCodeStr) {
            initCodeStr = curInitCodeStr;
            tickCodeStr = curTickCodeStr;
            getButtonTickId().disabled = true;
        }
        let curURLStr = location.href;
        if (curURLStr != prevURLStr) {
            addLog("changeURL", getRefName(curURLStr));
            prevURLStr = curURLStr;
        }
        if (isTick) {
            try {
                resetTexts();
                resetShapes();
                let f = getTickFunc(getCodeTickId().value);
                f();
                cnt++;
            } catch (e) {
                console.log(e);
                errorMes = e;
                if (e instanceof Error) {
                    addLog("error_tick", String(e));
                }
                else {
                    addLog("exit_tick", String(e));
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
        stage.update();
    });
});