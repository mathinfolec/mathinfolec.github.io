let curpId = 0;
let curVals = [];
let isAuto = false;
let step = function () {
    let fl = flow[curpId];
    console.log(curpId + ":" + fl.original);
    let f;
    isCont = true;
    try {
        highlight(curpId);
        switch (fl.type) {
            case "terminal-start":
                clearOut();
                f = getFunc();
                f();
                curpId = fl.next;
                break;
            case "terminal-end":
                isCont = false;
                break;
            case "let":
                f = getFunc("return " + fl.initVal + ";")
                setVal(fl.valName, f());
                console.log("setval finish");
                f = getFunc();
                f();
                curpId = fl.next;
                break;
            case "while-start":
                f = getIfFunc(fl.name);
                console.log(f);
                if (f()) {
                    curpId = fl.next;
                }
                else {
                    curpId = flow[fl.end].next;
                }
                break;
            case "if-start":
                f = getIfFunc(fl.name);
                if (f()) {
                    curpId = fl.next[0];
                }
                else {
                    curpId = fl.next[1];
                }
                break;
            case "while-end":
                curpId = fl.start;
                break;
            case "else":
            case "if-end":
            case "else-end":
                curpId = fl.next;
                break;
            case "process":
                f = getFunc(fl.name);
                f();
                curpId = fl.next;
                break;
            default:
                isCont = false;
                throw SyntaxError("構文解読に失敗しました");
        }
    } catch (e) {
        print(e);
    }
    return isCont;
}
let print = function (x) {
    document.getElementById("out").innerHTML += x + "<br/>";
}
let clearOut = function () {
    document.getElementById("out").innerHTML = "";
}
let clearValOut = function (n = 0) {
    document.getElementById("val").innerHTML = "<br/>".repeat(n);
}
let getFunc = function (str = "") {
    return Function("\"use strict\";" + getInitValsStr() + str + ";" + getUpdateValsStr());
}
let getIfFunc = function (str) {
    let tmpName;
    while (true) {
        tmpName = "v" + Math.floor((Math.random() * 1000)) + "i";
        if (typeof curVals[tmpName] == "undefined") {
            break;
        }
    }
    return Function("\"use strict\";" + getInitValsStr() + "let " + tmpName + "=(" + str + ");" + getUpdateValsStr() + "return " + tmpName + ";");
}
let getInitValsStr = function () {
    let arr = [];
    for (let i in curVals) {
        arr.push(i + "=" + curVals[i]);
    }
    if (arr.length) {
        return "let " + arr.join(",") + ";";
    }
    else {
        return "";
    }
}
let getUpdateValsStr = function () {
    let arr = [];
    for (let i in curVals) {
        arr.push("\"" + i + "\": " + i);
    }
    return "updateVals({" + arr.join(",") + "});";
}
let updateVals = function (vals) {
    clearValOut();
    console.log(vals);
    let d = document.getElementById("val");
    let len = 0;
    for (let i in vals) {
        curVals[i] = vals[i];
        d.innerHTML += i + " = " + curVals[i] + "<br/>";
        len += 1;
    }
    if (len < valNum) {
        d.innerHTML += "<br/>".repeat(valNum - len);
    }
}
let setVal = function (name, value) {
    curVals[name] = value;
}
let clickStep = function () {
    if (isAuto) return;
    step();
}
let clickAuto = function () {
    if (flow[curpId].type == "terminal-end") {
        resetStep();
        isAuto = true;
    }
    else {
        isAuto = !isAuto;
    }
    document.getElementById("button_step").disabled = isAuto;
}
let clickReset = function () {
    resetStep();
}
let resetStep = function () {
    curpId = 0;
    curVals = [];
    clearOut();
    clearValOut(valNum);
    isAuto = false;
    document.getElementById("button_auto").disabled = false;
    document.getElementById("button_step").disabled = false;
    document.getElementById("button_reset").disabled = false;
    highlight(-1);
}
let highlight = function (id) {
    for (let i = 0; i < flow.length; ++i) {
        document.getElementById(getDivId(i)).style.color = (i == id ? "red" : "black");
    }
}
