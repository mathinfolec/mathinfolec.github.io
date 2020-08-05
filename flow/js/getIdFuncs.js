getCanvasId = function (id) {
    return id + "_canvas";
}
getExpId = function (id) {
    return id + "_exp";
}
getValsId = function (id) {
    return id + "_vals";
}
getOutId = function (id) {
    return id + "_out";
}
getCanvasAreaId = function (id) {
    return id + "_canvasdiv";
}
getInputId = function (id, pId) {
    return id + "_input_" + pId;
}
getInput = function (id, pId) {
    return document.getElementById(getInputId(id, pId)).value;
}
getCodeId = function (id) {
    return id + "_code";
}
getX = function (padding) {
    return 20 + padding * (getW() + 20);
}
getY = function (depth) {
    return 20 + depth * fontSize * 3.5;
}
getW = function () {
    return 190;
}
getH = function () {
    return fontSize * 2;
}
getNewId = function (id) {
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