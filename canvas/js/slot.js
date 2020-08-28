const changeSlot = function (id) {
    if (curSlot == id) {
        return;
    }
    saveInitCodes[curSlot] = getCodeInitId().value;
    saveTickCodes[curSlot] = getCodeTickId().value;
    if (typeof saveInitCodes[id] == "undefined") {
        saveInitCodes[id] = "";
    }
    getCodeInitId().value = saveInitCodes[id];
    if (typeof saveTickCodes[id] == "undefined") {
        saveTickCodes[id] = "";
    }
    getCodeTickId().value = saveTickCodes[id];
    curSlot = id;
    getSpanSlotId().innerHTML = curSlot;
    prevInitCodeStr = saveInitCodes[id];
    prevTickCodeStr = saveTickCodes[id];
    logInterval = defLogInterval;
    getButtonTickId().disabled = true;
    addLog("load");
}