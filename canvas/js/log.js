const addLog = function (type, opt = null) {
    console.log("addLog(" + type + ")");
    let d = new Date();
    let time = (("0" + d.getHours()).slice(-2)) + ":" + (("0" + d.getMinutes()).slice(-2)) + ":" + (("0" + d.getSeconds()).slice(-2));
    logs.push({
        time: time,
        type: type,
        slot: curSlot,
        init: getCodeInitId().value,
        tick: getCodeTickId().value,
        opt: opt
    });
    if (type != "open" && type != "export") {
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