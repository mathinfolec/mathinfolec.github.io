const changeSlot = function (id) {
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
    if (curSlot != id) {
        addLog("load");
    }
}
const setupSlots = function () {
    let d = getSpanLoadButtonsId();
    for (let i = 1; i <= maxSlot; ++i) {
        let b = document.createElement("button");
        b.id = "button_load_" + i;
        b.setAttribute("onclick", "clickLoad(" + i + ")");
        b.innerHTML = i;
        d.appendChild(b);
    }
    changeSlot(1);
}
const importSlot = function (codes) {
    console.log(codes);
    getCodeInitId().value = codes[curSlot].init;
    getCodeTickId().value = codes[curSlot].tick;
    for (let i = 1; i <= maxSlot; ++i) {
        saveInitCodes[i] = codes[i].init;
        saveTickCodes[i] = codes[i].tick;
    }
}