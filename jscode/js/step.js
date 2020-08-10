const step = function () {
    let fl = flow[curpId];
    //console.log(curpId + ":" + fl.original);
    let f;
    isCont = true;
    try {
        highlight(curpId);
        switch (fl.type) {
            case "terminal-start":
                clearOut();
                setIns();
                f = getFunc();
                f();
                curpId = fl.next;
                break;
            case "terminal-end":
                isCont = false;
                break;
            case "let":
                for (let i = 0; i < fl.sets.length; ++i) {
                    f = getFunc("return " + fl.sets[i].initVal + ";")
                    setVal(fl.sets[i].valName, f());
                }
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
            case "for-start":
                if (fl.isFirst) {
                    f = getFunc(fl.name[0]);
                    f();
                    fl.isFirst = false;
                }
                f = getIfFunc(fl.name[1]);
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
            case "for-end":
                f = getFunc(flow[fl.start].name[2]);
                f();
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
                throw SyntaxError();
        }
    } catch (e) {
        if (e instanceof SyntaxError) {
            print("ERROR: コードが正しく入力されていない可能性があります。カッコの位置などを再確認してください。");
        }
        else if (e instanceof ReferenceError) {
            print("ERROR: 定義していない変数が使われている可能性があります。正しく変数を定義できているか確認してください。");
        }
        else if (e instanceof TypeError) {
            print("ERROR: 使えない変数名を指定している可能性があります。")
        }
        else {
            console.log(e);
        }
        document.getElementById("button_auto").disabled = true;
        document.getElementById("button_step").disabled = true;
        isCont = false;
        isAuto = false;
        addLog("error");
    } finally {
        return isCont;
    }
}
const print = function (x) {
    document.getElementById("out").innerHTML += x + "<br/>";
    curOuts.push(x);
}
const read = function () {
    if (ins.length) {
        let v = ins.shift();
        if (isNaN(Number(v))) {
            return '"' + v + '"';
        }
        else {
            return Number(v);
        }
    }
    else {
        return undefined;
    }
}
const clearOut = function () {
    document.getElementById("out").innerHTML = "";
}
const clearValOut = function (n = 0) {
    document.getElementById("val").innerHTML = "<br/>".repeat(n);
}
const setIns = function () {
    ins = document.getElementById("code_input").value.trim().split(/ +/);
}
const getFunc = function (str = "") {
    return Function("\"use strict\";" + getInitValsStr() + str + ";" + getUpdateValsStr());
}
const getIfFunc = function (str) {
    let tmpName;
    while (true) {
        tmpName = "v" + Math.floor((Math.random() * 1000)) + "i";
        if (typeof curVals[tmpName] == "undefined") {
            break;
        }
    }
    return Function("\"use strict\";" + getInitValsStr() + "let " + tmpName + "=(" + str + ");" + getUpdateValsStr() + "return " + tmpName + ";");
}
const getInitValsStr = function () {
    let arr = [];
    for (let i in curVals) {
        if (curVals[i] != undefined && isNaN(Number(curVals[i]))) {
            arr.push(i + "='" + curVals[i] + "'");
        }
        else {
            arr.push(i + "=" + curVals[i]);
        }
    }
    if (arr.length) {
        return "let " + arr.join(",") + ";";
    }
    else {
        return "";
    }
}
const getUpdateValsStr = function () {
    let arr = [];
    for (let i in curVals) {
        arr.push("\"" + i + "\": " + i);
    }
    return "updateVals({" + arr.join(",") + "});";
}
const updateVals = function (vals) {
    clearValOut();
    //console.log(vals);
    let d = document.getElementById("val");
    let len = 0;
    for (let i in vals) {
        curVals[i] = vals[i];
        d.innerHTML += i + ": " + curVals[i] + "<br/>";
        len += 1;
    }
    if (len < valNum) {
        d.innerHTML += "<br/>".repeat(valNum - len);
    }
}
const setVal = function (name, value) {
    if (typeof curVals[name] != "undefined") {
        throw SyntaxError("同じ名前の変数を複数回定義することはできません");
    }
    curVals[name] = value;
}
const resetStep = function () {
    curpId = 0;
    curVals = [];
    curOuts = [];
    clearOut();
    clearValOut(valNum);
    isAuto = false;
    for (let i = 0; i < flow.length; ++i) {
        if (flow[i].type == "for-start") {
            flow[i].isFirst = true;
        }
    }
    document.getElementById("button_auto").disabled = false;
    document.getElementById("button_step").disabled = false;
    document.getElementById("button_reset").disabled = false;
    highlight(-1);
}
const highlight = function (id) {
    for (let i = 0; i < flow.length; ++i) {
        document.getElementById(getDivId(i)).style.color = (i == id ? "red" : "black");
    }
}
