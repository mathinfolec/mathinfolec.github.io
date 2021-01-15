const init = function () {
    try {
        redrawBg();
        isTick = false;
        cnt = 0;
        getCodeInitId().disabled = false;
        getCodeInitId().disabled = false;
        setInitVals();
        let str = getCodeInitId().value;
        Function("'use strict';" + str)();
        redrawBg();
        if (str.match(/if\(.*\)/)) {
            throw SyntaxError("Cannot use if-statement in initialization");
        }
        let f = getInitFunc(str);
        f();
        setButton("tick", true);
        setButton("exec", true);
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
    setButton("init", false);
    //getButtonInitId().disabled = true;
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
    setButton("init", true);
    //getButtonInitId().disabled = false;
    for (let b of getSpanLoadButtonsId().childNodes) {
        b.disabled = false;
    }
    if (isExit) {
        setButton("tick", false);
        //setButton("exec", false);
        //getButtonTickId().disabled = true;
    }
    if (getCheckboxRecId().checked) {
        stopRec(!isExit);
    }
    getCheckboxRecId().checked = false;
    getCheckboxRecId().disabled = false;
    showTickButton(true);
}
const drawCircle = function (x, y, r) {
    /*
    let c = new createjs.Shape();
    c.graphics.beginFill(options.color).drawCircle(0, 0, r);
    c.x = x;
    c.y = y;
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
    */
    ctx.fillStyle = options.fillColor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
    if (options.lineWidth > 0) {
        ctx.strokeStyle = options.strokeColor;
        ctx.lineWidth = options.lineWidth;
    }
    ctx.stroke();
}
const drawEllipse = function (x, y, rx, ry) {
    /*
    let c = new createjs.Shape();
    c.graphics.beginFill(options.color).drawEllipse(0, 0, rx, ry);
    c.regX = rx / 2;
    c.regY = ry / 2;
    c.x = x;
    c.y = y;
    c.rotation = options.rotation;
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
    */
    ctx.fillStyle = options.fillColor;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, options.rotation / 180 * Math.PI, 0, 2 * Math.PI, false);
    ctx.fill();
    if (options.lineWidth > 0) {
        ctx.strokeStyle = options.strokeColor;
        ctx.lineWidth = options.lineWidth;
    }
    ctx.stroke();
}
const drawRect = function (x, y, w, h) {
    /*
    let c = new createjs.Shape();
    c.graphics.beginFill(options.color).drawRect(0, 0, w, h);
    c.regX = w / 2;
    c.regY = h / 2;
    c.x = x;
    c.y = y;
    c.rotation = options.rotation;
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
    */
    ctx.fillStyle = options.fillColor;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(options.rotation / 180 * Math.PI);
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 2);
    ctx.lineTo(w / 2, -h / 2);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.lineTo(-w / 2, -h / 2);
    ctx.fill();
    if (options.lineWidth > 0) {
        ctx.strokeStyle = options.strokeColor;
        ctx.lineWidth = options.lineWidth;
        ctx.stroke();
    }
    ctx.restore();
}
const drawRoundRect = function (x, y, w, h, rx, ry) {
    rx = Math.min(rx, w / 2);
    ry = Math.min(ry, h / 2);
    /*
    let c = new createjs.Shape();
    c.graphics.beginFill(options.color).drawRoundRect(0, 0, w, h, rx, ry);
    c.regX = w / 2;
    c.regY = h / 2;
    c.x = x;
    c.y = y;
    c.rotation = options.rotation;
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
    */
    ctx.fillStyle = options.fillColor;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(options.rotation / 180 * Math.PI);
    ctx.beginPath();
    ctx.moveTo(-w / 2 + rx, -h / 2);
    ctx.ellipse(w / 2 - rx, -h / 2 + ry, rx, ry, 0, 1.5 * Math.PI, 0);
    ctx.ellipse(w / 2 - rx, h / 2 - ry, rx, ry, 0, 0, 0.5 * Math.PI);
    ctx.ellipse(-w / 2 + rx, h / 2 - ry, rx, ry, 0, 0.5 * Math.PI, Math.PI);
    ctx.ellipse(-w / 2 + rx, -h / 2 + ry, rx, ry, 0, Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.fill();
    if (options.lineWidth > 0) {
        ctx.strokeStyle = options.strokeColor;
        ctx.lineWidth = options.lineWidth;
        ctx.stroke();
    }
    ctx.restore();
}
const drawLine = function (x0, y0, x1, y1) {
    /*
    let c = new createjs.Shape();
    c.graphics.beginStroke(options.color).moveTo(x0, y0).lineTo(x1, y1);
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
    */
    ctx.strokeStyle = options.strokeColor;
    ctx.lineWidth = options.lineWidth;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}
const drawQuadraticCurve = function (x0, y0, x1, y1, x2, y2) {
    /*
    let c = new createjs.Shape();
    c.graphics.beginStroke(options.color).moveTo(x0, y0);
    c.graphics.quadraticCurveTo(x1, y1, x2, y2);
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
    */
    ctx.strokeStyle = options.strokeColor;
    ctx.lineWidth = options.lineWidth;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(x1, y1, x2, y2);
    ctx.stroke();
}
const drawBezierCurve = function (x0, y0, x1, y1, x2, y2, x3, y3) {
    /*
    let c = new createjs.Shape();
    c.graphics.beginStroke(options.color).moveTo(x0, y0);
    c.graphics.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    c.alpha = options.alpha;
    stage.addChild(c);
    shapes.push(c);
    */
    ctx.strokeStyle = options.strokeColor;
    ctx.lineWidth = options.lineWidth;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    ctx.stroke();
}
const drawPoly = function () {
    if (arguments.length % 2 != 0) {
        return;
    }
    //let c = new createjs.Shape();
    let sx = arguments[0];
    let sy = arguments[1];
    for (let i = 1; i < arguments.length / 2; ++i) {
        sx += arguments[2 * i];
        sy += arguments[2 * i + 1];
    }
    sx /= (arguments.length / 2);
    sy /= (arguments.length / 2);
    /*
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
    */
    ctx.fillStyle = options.fillColor;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(options.rotation / 180 * Math.PI);
    ctx.beginPath();
    ctx.moveTo(arguments[0] - sx, arguments[1] - sy);
    for (let i = 1; i < arguments.length / 2; ++i) {
        ctx.lineTo(arguments[2 * i] - sx, arguments[2 * i + 1] - sy);
    }
    ctx.lineTo(arguments[0] - sx, arguments[1] - sy);
    ctx.fill();
    if (options.lineWidth > 0) {
        ctx.strokeStyle = options.strokeColor;
        ctx.lineWidth = options.lineWidth;
        ctx.stroke();
    }
    ctx.restore();
}
const setColor = function (c) {
    options.color = c;
}
const setFillColor = function (c) {
    options.fillColor = c;
}
const setStrokeColor = function (c) {
    options.strokeColor = c;
}
const setBgColor = function (c) {
    options.bgColor = c;
}
const setLineWidth = function (w) {
    options.lineWidth = w;
}
const setRotation = function (r) {
    options.rotation = r;
}
const setAlpha = function (a) {
    options.alpha = a;
}
const display = function (text, x = 0, y = 0, size = 20) {
    /*
    let t = new createjs.Text(text, size + "px sans-serif", options.color);
    t.x = x;
    t.y = y;
    stage.addChild(t);
    shapes.push(t);
    */
    ctx.fillStyle = options.fillColor;
    ctx.font = size + "px sans-serif";
    ctx.fillText(text, x, y);
}
const random = function (max) {
    return Math.random() * max;
}
const randomInt = function (max) {
    return Math.floor(random(max));
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
    if (typeof keyStrList[c] == "undefined") {
        keyStrList[c] = false;
    }
    return keyStrList[c];
}
const rgb = function (r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}
const rgba = function (r, g, b, a) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
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
const getInitFunc = function (c) {
    //c = c.replace(/\n/g, "");
    return Function("'use strict';" + getInitObjStr() + c + "\n" + getUpdateStr() + getResetCanvasStr());
}
const getTickFunc = function (c) {
    //c = c.replace(/\n/g, "");
    return Function("'use strict';" + getResetCanvasStr() + getInitValsStr() + getInitObjStr() + c + "\n" + getUpdateStr());
}
const setInitVals = function () {
    for (let i in defOptions) {
        options[i] = defOptions[i];
    }
    curVals = {};
    let cArr = getCodeInitId().value.split(/[;\n]/);
    for (let c of cArr) {
        c = c.trim();
        if (c.match(/^let /)) {
            let lArr = c.replace(/^let /, "").split(",");
            for (let l of lArr) {
                let vArr = l.trim().split("=");
                let vName = vArr[0].trim();
                curVals[vName] = undefined;
                /*
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
                */
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
    s += "const mouseX=" + curMouseX + ",mouseY=" + curMouseY + ";";
    return s;
}
const getUpdateStr = function () {
    let s = "";
    let vArr = [];
    for (let i in curVals) {
        vArr.push("'" + i + "':" + i);
    }
    s += "updateVals({" + vArr.join(",") + "});";
    return s;
}
const getResetCanvasStr = function () {
    return "redrawBg();";
}
const updateVals = function (vals) {
    for (let i in curVals) {
        curVals[i] = vals[i];
    }
}
/*
const resetShapes = function () {
    for (let i = 0; i < shapes.length; ++i) {
        stage.removeChild(shapes[i]);
    }
    shapes = [];
}
*/
const redrawBg = function () {
    ctx.fillStyle = options.bgColor;
    ctx.fillRect(0, 0, c_width, c_height);
}