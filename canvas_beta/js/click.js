const clickInit = function () {
    addLog("init");
    init();
}
const clickTick = function () {
    addLog("tick");
    tick();
}
const clickStop = function () {
    addLog("stop");
    stop();
}
const clickLoad = function (id) {
    changeSlot(id);
}