const getCanvasId = function (id) {
    return id + "_canvas";
}
const getExpId = function (id) {
    return id + "_exp";
}
const getValsId = function (id) {
    return id + "_vals";
}
const getOutId = function (id) {
    return id + "_out";
}
const getCanvasAreaId = function (id) {
    return id + "_canvasdiv";
}
const getInputId = function (id, pId) {
    return id + "_input_" + pId;
}
const getInput = function (id, pId) {
    return document.getElementById(getInputId(id, pId)).value;
}
const getCodeId = function (id) {
    return id + "_code";
}
const getX = function (padding) {
    return 20 + padding * (getW() + 20);
}
const getY = function (depth) {
    return 20 + depth * fontSize * 3.5;
}
const getW = function () {
    return 190;
}
const getH = function () {
    return fontSize * 2;
}
const getNewId = function (id) {
    let s;
    while (true) {
        s = "";
        for (let i = 0; i < 6; ++i) {
            s = s + ((10 + Math.floor(Math.random() * 26)).toString(36));
        }
        if (typeof parts[id][s] == "undefined") {
            break;
        }
    }
    return s;
}