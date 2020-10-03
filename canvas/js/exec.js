const init = function () {
    try {
        isTick = false;
        cnt = 0;
        getCodeInitId().disabled = false;
        getCodeInitId().disabled = false;
        setInitVals();
        //resetTexts();
        //resetShapes();
        //resetTraces();
        let f = getInitFunc(getCodeInitId().value);
        f();
        getButtonTickId().disabled = false;
        showTickButton(true);
        return true;
    } catch (e) {
        window.alert(e);
        if (e instanceof Error) {
            addLog("error_init", String(e));
        }
        else {
            addLog("exit_init", String(e));
        }
        return false;
    }
}
const tick = function () {
    getCodeInitId().disabled = true;
    getCodeTickId().disabled = true;
    showTickButton(false);
    getButtonInitId().disabled = true;
    for (let b of getSpanLoadButtonsId().childNodes) {
        b.disabled = true;
    }
    getCheckboxRecId().disabled = true;
    if (getCheckboxRecId().checked) {
        startRec();
    }
    isTick = true;
}
const stop = function (isExit = false) {
    isTick = false;
    getCodeInitId().disabled = false;
    getCodeTickId().disabled = false;
    getButtonInitId().disabled = false;
    for (let b of getSpanLoadButtonsId().childNodes) {
        b.disabled = false;
    }
    if (isExit) {
        getButtonTickId().disabled = true;
    }
    if (getCheckboxRecId().checked) {
        stopRec(!isExit);
    }
    getCheckboxRecId().checked = false;
    getCheckboxRecId().disabled = false;
    showTickButton(true);
}
const drawCircle = function (x, y, r) {
    let c = new createjs.Shape();
    c.graphics.beginFill(options.color).drawCircle(0, 0, r);
    c.x = x;
    c.y = y;
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
}
const drawEllipse = function (x, y, w, h) {
    let c = new createjs.Shape();
    c.graphics.beginFill(options.color).drawEllipse(0, 0, w, h);
    c.regX = w / 2;
    c.regY = h / 2;
    c.x = x;
    c.y = y;
    c.rotation = options.rotation;
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
}
const drawRect = function (x, y, w, h, rw = 0, rh = 0) {
    let c = new createjs.Shape();
    c.graphics.beginFill(options.color).drawRect(0, 0, w, h, rw, rh);
    c.regX = w / 2;
    c.regY = h / 2;
    c.x = x;
    c.y = y;
    c.rotation = options.rotation;
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
}
const drawLine = function (x0, y0, x1, y1) {
    let c = new createjs.Shape();
    c.graphics.beginStroke(options.color).moveTo(x0, y0).lineTo(x1, y1);
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
}
const drawQuadraticCurve = function (x0, y0, x1, y1, x2, y2) {
    let c = new createjs.Shape();
    c.graphics.beginStroke(options.color).moveTo(x0, y0);
    c.graphics.quadraticCurveTo(x1, y1, x2, y2);
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
}
const drawBezierCurve = function (x0, y0, x1, y1, x2, y2, x3, y3) {
    let c = new createjs.Shape();
    c.graphics.beginStroke(options.color).moveTo(x0, y0);
    c.graphics.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
}
const drawPoly = function () {
    if (arguments.length % 2 != 0) {
        return;
    }
    let c = new createjs.Shape();
    let sx = arguments[0];
    let sy = arguments[1];
    for (let i = 1; i < arguments.length / 2; ++i) {
        sx += arguments[2 * i];
        sy += arguments[2 * i + 1];
    }
    sx /= (arguments.length / 2);
    sy /= (arguments.length / 2);
    c.graphics.beginFill(options.color);
    c.graphics.moveTo(arguments[0], arguments[1]);
    for (let i = 1; i < arguments.length / 2; ++i) {
        c.graphics.lineTo(arguments[2 * i], arguments[2 * i + 1]);
    }
    c.graphics.lineTo(arguments[0], arguments[1]);
    c.regX = sx;
    c.regY = sy;
    c.x = sx;
    c.y = sy;
    c.rotation = options.rotation;
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
}
const setColor = function (c) {
    options.color = c;
}
const setRotation = function (r) {
    options.rotation = r;
}
const setAlpha = function (a) {
    options.alpha = a;
}
const display = function (text, x = 0, y = 0, size = 20) {
    let t = new createjs.Text(text, size + "px sans-serif", options.color);
    t.x = x;
    t.y = y;
    stage.addChild(t);
    shapes.push(t);
}
const random = function (min, max) {
    return min + Math.random() * (max - min);
}
const randomInt = function (min, max) {
    return Math.floor(random(min, max));
}
const sqrt = function (x) {
    return Math.sqrt(x);
}
const sin = function (x) {
    return Math.sin(x / 180 * Math.PI);
}
const cos = function (x) {
    return Math.cos(x / 180 * Math.PI);
}
const tan = function (x) {
    return Math.tan(x / 180 * Math.PI);
}
const isPressed = function (c) {
    if (typeof keyList[c] == "undefined") {
        keyList[c] = false;
    }
    return keyList[c];
}
const rgb = function (dr, dg, db) {
    dr = Math.min(255, Math.max(0, dr));
    dg = Math.min(255, Math.max(0, dg));
    db = Math.min(255, Math.max(0, db));
    let hr = ('00' + dr.toString(16)).slice(-2);
    let hg = ('00' + dg.toString(16)).slice(-2);
    let hb = ('00' + db.toString(16)).slice(-2);
    let s = '#' + hr + hg + hb;
    return s;
}
const max = function () {
    let m = arguments[0];
    for (let i of arguments) {
        m = Math.max(m, i);
    }
    return m;
}
const min = function () {
    let m = arguments[0];
    for (let i of arguments) {
        m = Math.min(m, i);
    }
    return m;
}
const abs = function (x) {
    return Math.abs(x);
}
/*
const exit = function (str = "End of the Program") {
    throw str;
}
*/
const getInitFunc = function (c) {
    //c = c.replace(/(exit\()/, getUpdateStr() + "$1");
    c = c.replace(/\n/g, "");
    return Function("'use strict';" + getInitObjStr() + c + getUpdateStr() + getResetCanvasStr());
}
const getTickFunc = function (c) {
    //c = c.replace(/(exit\()/g, getUpdateStr() + "$1");
    c = c.replace(/\n/g, "");
    return Function("'use strict';" + getResetCanvasStr() + getInitValsStr() + getInitObjStr() + c + getUpdateStr());
}
const setInitVals = function () {
    for (let i in defOptions) {
        options[i] = defOptions[i];
    }
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
    let s = "";
    let vArr = [];
    for (let i in curVals) {
        if (isNaN(Number(curVals[i]))) {
            vArr.push(i + "=\"" + curVals[i] + "\"");
        }
        else {
            vArr.push(i + "=" + curVals[i]);
        }
    }
    if (vArr.length) {
        s += "let " + vArr.join(",") + ";";
    }

    return s;
}
const getInitObjStr = function () {
    let s = "";
    s += "const cnt=" + cnt + ";const pi=Math.PI;";
    s += "const mouseX=" + stage.mouseX + ",mouseY=" + stage.mouseY + ";";
    /*
    if (reset) {
        s += "let ball=" + JSON.stringify(defBallParam) + ";";
        s += "let rect=" + JSON.stringify(defRectParam) + ";";
    }
    else {
        s += "let ball=" + JSON.stringify(ballParam) + ";";
        s += "let rect=" + JSON.stringify(rectParam) + ";";
    }*/
    return s;
}
const getUpdateStr = function () {
    let s = "";
    //let s = "updateObj(ball,rect);"
    let vArr = [];
    for (let i in curVals) {
        vArr.push("'" + i + "':" + i);
    }
    s += "updateVals({" + vArr.join(",") + "});";
    return s;
}
const getResetCanvasStr = function () {
    return "setColor('black');resetShapes();";
}
/*
const updateObj = function (ball, rect) {
    for (let i in ballParam) {
        ballParam[i] = ball[i];
    }
    for (let i in rectParam) {
        rectParam[i] = rect[i];
    }
    stage.removeChild(actBall);
    let b = new createjs.Shape();
    b = new createjs.Shape();
    b.graphics.beginFill(ballParam.color).drawCircle(0, 0, ballParam.r);
    b.x = ballParam.x;
    b.y = ballParam.y;
    stage.removeChild(actRect);
    let r = new createjs.Shape();
    r.graphics.beginFill(rectParam.color).drawRect(0, 0, rectParam.w, rectParam.h);
    r.regX = rectParam.w / 2;
    r.regY = rectParam.h / 2;
    r.x = rectParam.x;
    r.y = rectParam.y;
    r.rotation = rectParam.rot;
    if (cnt > 0) {
        setTraceObj(b, r);
    }
    actBall = b;
    actRect = r;
    updateCanvas();
}
const setTraceObj = function (b, r) {
    if (ballParam.trace > 0) {
        if (traceBalls.length > ballParam.trace) {
            while (traceBalls.length > ballParam.trace) {
                stage.removeChild(traceBalls[0]);
                traceBalls.shift();
            }
        }
        let blen = traceBalls.length;
        for (let i = 0; i < blen; i++) {
            traceBalls[i].alpha = 1 - (blen - i) / (ballParam.trace + 2);
        }
        traceBalls.push(b);
    }
    if (rectParam.trace > 0) {
        if (traceRects.length > rectParam.trace) {
            while (traceRects.length > rectParam.trace) {
                stage.removeChild(traceRects[0]);
                traceRects.shift();
            }
        }
        let rlen = traceRects.length;
        for (let i = 0; i < rlen; i++) {
            traceRects[i].alpha = 1 - (rlen - i) / (rectParam.trace + 2);
        }
        traceRects.push(r);
    }
}
*/
const updateVals = function (vals) {
    for (let i in curVals) {
        curVals[i] = vals[i];
    }
}
/*
const updateCanvas = function () {
    for (let i = 0; i < traceRects.length - 1; ++i) {
        stage.addChild(traceRects[i]);
    }
    stage.addChild(actRect);
    for (let i = 0; i < traceBalls.length - 1; ++i) {
        stage.addChild(traceBalls[i]);
    }
    stage.addChild(actBall);
    for (let i = 0; i < texts.length; ++i) {
        stage.addChild(texts[i]);
    }
}
const resetTexts = function () {
    for (let i = 0; i < texts.length; ++i) {
        stage.removeChild(texts[i]);
    }
    texts = [];
}
const resetTraces = function () {
    for (let i = 0; i < traceBalls.length; ++i) {
        stage.removeChild(traceBalls[i]);
    }
    traceBalls = [];
    for (let i = 0; i < traceRects.length; ++i) {
        stage.removeChild(traceRects[i]);
    }
    traceRects = [];
}
*/
const resetShapes = function () {
    for (let i = 0; i < shapes.length; ++i) {
        stage.removeChild(shapes[i]);
    }
    shapes = [];
}