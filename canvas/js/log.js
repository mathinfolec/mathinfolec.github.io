const addLog = function (type, opt = null) {
    console.log("addLog(" + type + ")");
    let d = new Date();
    let time = (("0" + d.getHours()).slice(-2)) + ":" + (("0" + d.getMinutes()).slice(-2)) + ":" + (("0" + d.getSeconds()).slice(-2)) + "." + (("00" + d.getMilliseconds()).slice(-3));
    logs.push({
        time: time,
        type: type,
        slot: curSlot,
        init: getCodeInitId().value,
        tick: getCodeTickId().value,
        opt: opt
    });
    if (type != "open" && type != "export" && type != "import") {
        isAddedLog = true;
    }
}
const exportLogs = function () {
    let v = window.prompt("学年,組,出席番号で構成される4桁のIDを半角で入力してください。\n(例)5年1組3番:5103");
    if (v != null && v.match(/^[0-9]{4}$/)) {
        addLog("export");
        changeSlot(curSlot);
        let codeArr = {};
        for (let i = 1; i <= maxSlot; ++i) {
            codeArr[i] = {
                init: saveInitCodes[i],
                tick: saveTickCodes[i]
            };
            if (codeArr[i].init == undefined) {
                codeArr[i].init = "";
            }
            if (codeArr[i].tick == undefined) {
                codeArr[i].tick = "";
            }
        }
        let expArr = ["id=" + v + ";logs=" + JSON.stringify(logs) + ";codes=" + JSON.stringify(codeArr) + ";"];
        let blob = new Blob(expArr, { type: "text/plain" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "logs" + v + ".log";
        link.click();
        isAddedLog = false;
        window.alert("活動記録をダウンロードしました。");
    }
    else {
        window.alert("IDが正しくないためダウンロードできませんでした。");
    }
}
