const init = function () {
    try {
        isTick = false;
        cnt = 0;
        getCodeInitId().disabled = false;
        getCodeInitId().disabled = false;
        setInitVals();
        resetTexts();
        let f = getInitFunc(getCodeInitId().value);
        f();
        getButtonTickId().disabled = false;
        showTickButton(true);
        return true;
    } catch (e) {
        window.alert(e);
        if (e instanceof Error) {
            addLog("error_init");
        }
        else {
            addLog("exit_init");
        }
        return false;
    }
}
const tick = function () {
    getCodeInitId().disabled = true;
    getCodeTickId().disabled = true;
    showTickButton(false);
    getButtonInitId().disabled = true;
    isTick = true;
}
const stop = function () {
    isTick = false;
    getCodeInitId().disabled = false;
    getCodeTickId().disabled = false;
    getButtonInitId().disabled = false;
    showTickButton(true);
}
const display = function (text, x = 0, y = 0, size = 20) {
    let t = new createjs.Text(text, size + "px sans-serif", "white");
    t.x = x;
    t.y = y;
    texts.push(t);
}
const random = function (min, max) {
    return min + Math.random() * (max - min);
}
const randomInt = function (min, max) {
    return Math.floor(random(min, max));
}
const exit = function (str = "End of the Program") {
    throw str;
}
const resetTexts = function () {
    for (let i = 0; i < texts.length; ++i) {
        stage.removeChild(texts[i]);
    }
    texts = [];
}
const getInitFunc = function (c) {
    c = c.replace(/(exit\()/, getUpdateStr() + "$1");
    return Function("'use strict';" + getInitObjStr() + c + ";" + getUpdateStr());
}
const getTickFunc = function (c) {
    c = c.replace(/(exit\()/, getUpdateStr() + "$1");
    return Function("'use strict';" + getInitObjStr() + getInitValsStr() + c + ";" + getUpdateStr());
}
const setInitVals = function () {
    curVals = {};
    let cArr = getCodeInitId().value.split(";");
    for (let c of cArr) {
        c = c.trim();
        if (c.match(/^let /)) {
            let lArr = c.replace(/^let /, "").split(",");
            for (let l of lArr) {
                let vArr = l.trim().split("=");
                let vName = vArr[0].trim();
                let vValue;
                if (vArr.length == 1) {
                    vValue = undefined;
                }
                else {
                    vArr[1] = vArr[1].trim();
                    if (isNaN(Number(vArr[1]))) {
                        vValue = vArr[1];
                    }
                    else {
                        vValue = Number(vArr[1]);
                    }
                }
                curVals[vName] = vValue;
            }
        }
    }
}
const getInitValsStr = function () {
    let vArr = [];
    for (let i in curVals) {
        vArr.push(i + "=" + curVals[i]);
    }
    if (vArr.length) {
        return "let " + vArr.join(",") + ";";
    }
    else {
        return "";
    }
}
const getInitObjStr = function () {
    let s = "let ball=" + JSON.stringify(ballParam) + ";";
    s += "let rect=" + JSON.stringify(rectParam) + ";";
    s += "const cnt=" + cnt + ";";
    let mouse = {
        x: stage.mouseX,
        y: stage.mouseY
    };
    s += "const mouse=" + JSON.stringify(mouse) + ";";
    return s;
}
const getUpdateStr = function () {
    let s = "updateObj(ball,rect);"
    let vArr = [];
    for (let i in curVals) {
        vArr.push("'" + i + "':" + i);
    }
    if (vArr.length) {
        s += "updateVals({" + vArr.join(",") + "})";
    }
    return s;
}
const updateObj = function (ball, rect) {
    for (let i in ballParam) {
        ballParam[i] = ball[i];
    }
    for (let i in rectParam) {
        rectParam[i] = rect[i];
    }
    stage.removeChild(actBall);
    actBall = new createjs.Shape();
    actBall.graphics.beginFill(ballParam.color).drawCircle(0, 0, ballParam.r);
    actBall.x = ballParam.x;
    actBall.y = ballParam.y;
    stage.removeChild(actRect);
    actRect = new createjs.Shape();
    actRect.graphics.beginFill(rectParam.color).drawRect(0, 0, rectParam.w, rectParam.h);
    actRect.x = rectParam.x - rectParam.w / 2;
    actRect.y = rectParam.y - rectParam.h / 2;
    actRect.regX = rectParam.w / 2;
    actRect.regY = rectParam.h / 2;
    actRect.rotation = rectParam.rot;
    updateCanvas();
}
const updateVals = function (vals) {
    for (let i in curVals) {
        curVals[i] = vals[i];
    }
}
const updateCanvas = function () {
    stage.addChild(actRect);
    stage.addChild(actBall);
    for (let i = 0; i < texts.length; ++i) {
        stage.addChild(texts[i]);
    }
}