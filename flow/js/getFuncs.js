const getFunc = function (id, str = "") {
    return Function("\"use strict\";" + getInitValsStr(id) + str + ";" + getUpdateValsStr(id));
}
const getIfFunc = function (id, str) {
    let tmpName;
    while (true) {
        tmpName = "v" + Math.floor((Math.random() * 1000)) + "i";
        if (typeof curVals[id][tmpName] == "undefined") {
            break;
        }
    }
    return Function("\"use strict\";" + getInitValsStr(id) + "let " + tmpName + "=(" + str + ");" + getUpdateValsStr(id) + "return " + tmpName + ";");
}
const getInitValsStr = function (id) {
    let arr = [];
    for (let i in curVals[id]) {
        arr.push(i + "=" + curVals[id][i]);
    }
    if (arr.length) {
        return "let " + arr.join(",") + ";";
    }
    else {
        return "";
    }
}
const getUpdateValsStr = function (id) {
    let arr = [];
    for (let i in curVals[id]) {
        arr.push("\"" + i + "\": " + i);
    }
    return "updateVals('" + id + "',{" + arr.join(",") + "});";
}
const clearValsOut = function (id) {
    document.getElementById(getValsId(id)).innerHTML = "";
}
const clearOut = function (id) {
    document.getElementById(getValsId(id)).innerHTML = "";
    document.getElementById(getOutId(id)).innerHTML = "";
}
