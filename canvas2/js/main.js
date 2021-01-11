window.addEventListener("load", function () {
    setup();
    document.getElementById("lastmodified").innerHTML = document.lastModified;
    document.getElementById("import").addEventListener("change", function (e) {
        try {
            let fs = e.target.files;
            let reader = new FileReader();
            reader.readAsText(fs[0]);
            reader.onload = function () {
                //console.log(reader.result);
                importLogs(reader.result, isAdmin);
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
    window.addEventListener("keydown", function (e) {
        if (isTick) {
            e.preventDefault();
            let key = e.key;
            if (typeof keyConv[key] != "undefined") {
                key = keyConv[key];
            }
            keyStrList[key] = true;
        }
    });
    window.addEventListener("keyup", function (e) {
        if (isTick) {
            e.preventDefault();
            let key = e.key;
            if (typeof keyConv[key] != "undefined") {
                key = keyConv[key];
            }
            keyStrList[key] = false;
        }
    });
    window.addEventListener("focus", function (e) {
        addLog("focus");
    })
    window.addEventListener("blur", function (e) {
        addLog("blur");
        for (let i in keyStrList) {
            keyStrList[i] = false;
        }
    });
    canvas.addEventListener("mousemove", function (e) {
        let rect = e.target.getBoundingClientRect();
        curMouseX = e.clientX - rect.left;
        curMouseY = e.clientY - rect.top;
    });
    //createjs.Ticker.framerate = FPS;
    //createjs.Ticker.addEventListener("tick", function () {
    window.setInterval(function () {
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
                //resetTexts();
                //resetShapes();
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
        //stage.update();
    }, 1000 / FPS);
});
