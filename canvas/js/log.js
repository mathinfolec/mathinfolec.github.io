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
    let v = window.prompt("5桁のIDを入力してください。");
    if (v != null && v.match(/^[0-9]{5}$/)) {
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
        let d = new Date();
        let dStr = (("0" + (d.getMonth() + 1)).slice(-2)) + (("0" + d.getDate()).slice(-2));
        link.download = "logs" + v + "_" + dStr + ".log";
        link.click();
        isAddedLog = false;
        window.alert("活動記録をダウンロードしました。");
    }
    else {
        window.alert("IDが正しくないためダウンロードできませんでした。");
    }
}
const importLogs = function (str) {
    if (window.confirm("ログファイルを読み込みますか？ 現時点でシミュレータ上に書かれたコードはすべて上書きされます。")) {
        let f0str = "'use strict';let id,logs,codes;";
        let f1str = "importSlot(codes);";
        let func = Function(f0str + str + f1str);
        func();
        addLog("import");
    }
}