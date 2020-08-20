let logs = [];
let isAddedLog = false;
const addLog = function (id) {
    console.log("addLog(" + id + ")");
    let d = new Date();
    let time = (("0" + d.getHours()).slice(-2)) + ":" + (("0" + d.getMinutes()).slice(-2)) + ":" + (("0" + d.getSeconds()).slice(-2));
    logs.push({
        time: time,
        id: id,
        init: getCodeInitId().value,
        tick: getCodeTickId().value
    });
    if (id != "open" && id != "export") {
        isAddedLog = true;
    }
}
const exportLogs = function () {
    let v = window.prompt("学年,組,出席番号で構成される4桁のIDを半角で入力してください。\n(例)5年1組3番:5103");
    if (v != null && v.match(/^[0-9]{4}$/)) {
        addLog("export");
        let blob = new Blob(["logs[" + v + "]=" + JSON.stringify(logs)], { type: "text/plain" });
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