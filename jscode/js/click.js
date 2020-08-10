const clickStep = function () {
    addLog("step");
    if (isAuto) return;
    step();
}
const clickAuto = function () {
    addLog("auto");
    if (flow[curpId].type == "terminal-end") {
        resetStep();
        isAuto = true;
    }
    else {
        isAuto = !isAuto;
    }
    document.getElementById("button_step").disabled = isAuto;
}
const clickReset = function () {
    addLog("reset");
    resetStep();
}
const clickShowTextArea = function () {
    addLog("showTextArea");
    showTextArea();
}
const clickConv = function () {
    addLog("conv");
    conv();
}
let log = [];
let isAddedLog = false;
const addLog = function (type) {
    let d = new Date();
    let t = (("0" + d.getHours()).slice(-2)) + ":" + (("0" + d.getMinutes()).slice(-2)) + ":" + (("0" + d.getSeconds()).slice(-2));
    log.push({
        time: t,
        type: type,
        qid: curqId,
        code: getCode()
    });
    if (type != "load" && type != "export") {
        isAddedLog = true;
    }
}
const exportLog = function () {
    let v = window.prompt("学年,組,出席番号で構成される4桁のIDを半角で入力してください。\n(例)5年1組3番:5103");
    if (v != null && v.match(/^[0-9]{4}$/)) {
        addLog("export");
        let blob = new Blob(["logs[" + v + "]=" + JSON.stringify(log)], { type: "text/plain" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "logs" + v + ".txt";
        link.click();
        isAddedLog = false;
        window.alert("活動記録をダウンロードしました。");
    }
    else {
        window.alert("IDが正しくないためダウンロードできませんでした。");
    }
}