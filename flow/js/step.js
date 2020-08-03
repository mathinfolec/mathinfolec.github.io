step = function (id) {
    let isCont = true;
    try {
        setCurId(id);
        let data = parts[id][curpIds[id]];
        let f;
        let execStr;
        let letArr = [];
        for (let i in objs[id]) {
            objs[id][i].alpha = (i == curpIds[id] ? 1 : 0.5);
        }
        switch (data.type) {
            case "terminal-start":
                clearOut(id);
                f = getFunc(id);
                f();
                curpIds[id] = data.next;
                break;
            case "terminal-end":
                isCont = false;
                isAuto = false;
                break;
            case "process":
                if (data.name.indexOf("let ") > -1) {
                    letArr = data.name.replace(/let /, "").split("=");
                    f = getFunc(id, "return " + letArr[1] + ";");
                    setVal(id, letArr[0].trim(), f());
                    f = getFunc(id);
                }
                else {
                    execStr = data.name + ";";
                    f = getFunc(id, execStr);
                }
                f();
                curpIds[id] = data.next;
                break;
            case "process-let":
                f = getFunc(id, "return " + getInput(id, curpIds[id]) + ";")
                setVal(id, data.prop.valName, f());
                f = getFunc(id);
                f();
                curpIds[id] = data.next;
                break;
            case "process-any":
                if (getInput(id, curpIds[id]).indexOf("let ") > -1) {
                    letArr = getInput(id, curpIds[id]).replace(/let /, "").split("=");
                    f = getFunc(id, "return " + letArr[1]);
                    setVal(id, letArr[0].trim(), f());
                    f = getFunc(id, "");
                }
                else {
                    f = getFunc(id, getInput(id, curpIds[id]));
                }
                f();
                curpIds[id] = data.next;
                break;
            case "if-else":
                f = getIfFunc(id, data.name);
                if (f()) {
                    curpIds[id] = data.next[0];
                }
                else {
                    curpIds[id] = data.next[1];
                }
                break;
            case "if-blank":
                f = getIfFunc(id, getInput(id, curpIds[id]));
                if (f()) {
                    curpIds[id] = data.next[0];
                }
                else {
                    curpIds[id] = data.next[1];
                }
                break;
            case "nothing":
                curpIds[id] = data.next;
                step(id);
                break;
            case "for-range":
            case "for-range-blank":
                if (!data.prop.isInited) {
                    if (data.type == "for-range-blank") {
                        parts[id][curpIds[id]].prop.range = "range(" + getInput(id, curpIds[id]) + ")";
                    }
                    parts[id][curpIds[id]].prop.remains = getFunc(id, "return " + parts[id][curpIds[id]].prop.range + ";")();
                    parts[id][curpIds[id]].prop.isInited = true;
                }
                console.log(data.prop.remains);
                setVal(id, data.prop.valName, data.prop.remains.shift());
                curpIds[id] = data.next;
                break;
            case "for-end":
                if (parts[id][data.start].prop.remains.length) {
                    curpIds[id] = data.start;
                }
                else {
                    curpIds[id] = data.next;
                }
                break;
        }
    } catch (e) {
        print(e);
        isCont = false;
    } finally {
        return isCont;
    }
}
setVal = function (id, name, value) {
    curVals[id][name] = value;
}
updateVals = function (id, vals) {
    for (let i in vals) {
        curVals[id][i] = vals[i];
    }
    clearValsOut(id);
    if (typeof options[id].vals != "undefined") {
        for (let x of options[id].vals) {
            if (typeof curVals[id][x] != "undefined") {
                document.getElementById(getValsId(id)).innerHTML += x + " = " + curVals[id][x] + "<br/>";
            }
            else {
                document.getElementById(getValsId(id)).innerHTML += "<br/>";
            }
        }
    }
    console.log(curVals[id]);
}
autoStep = function (id) {
    if (id == curId) {
        isAuto = !isAuto;
    }
    else {
        curId = id;
        isAuto = true;
    }
}
resetStep = function (id) {
    curpIds[id] = options[id].startId;
    clearOut(id);
    isAuto = false;
    for (let i in parts[id]) {
        if (parts[id][i].type == "for-range" || parts[id][i].type == "for-range-blank") {
            parts[id][i].prop.isInited = false;
            parts[id][i].prop.remains = [];
        }
    }
    for (let i in objs[id]) {
        objs[id][i].alpha = 1;
    }
    curVals[id] = {};
    document.getElementById(getValsId(id)).innerHTML = "<br/>".repeat(options[id].vals.length);
}