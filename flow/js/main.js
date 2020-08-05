print = function (x = "") {
    document.getElementById(getOutId(curId)).innerHTML += x + "<br/>";
}
setCurId = function (id) {
    curId = id;
}
range = function (a, b) {
    let arr = [];
    for (let i = a; i < b; i++) {
        arr.push(i);
    }
    return arr;
}
clickAutoStep = function (id) {
    addLog("auto", id);
    autoStep(id);
}
clickStep = function (id) {
    addLog("step", id);
    step(id);
}
clickResetStep = function (id) {
    addLog("reset", id);
    resetStep(id);
}
addLog = function (name, id) {
    let d = new Date();
    let t = (("0" + d.getHours()).slice(-2)) + ":" + (("0" + d.getMinutes()).slice(-2)) + ":" + (("0" + d.getSeconds()).slice(-2));
    let ins = {};
    for (let i in parts[id]) {
        switch (parts[id][i].type) {
            case "process-any":
            case "process-let":
            case "if-blank":
            case "while-blank":
            case "for-range-blank":
                ins[i] = getInput(id, i);
                break;
            default:
                break;
        }
    }
    logs.push({
        name: name,
        id: id,
        date: t,
        input: ins
    });
    isAddedLog = true;
}
showToc = function () {
    document.getElementById("toc-ol").style.display = "block";
    document.getElementById("toc-open").style.display = "none";
    document.getElementById("toc-close").style.display = "inline-block";
}
hideToc = function () {
    document.getElementById("toc-ol").style.display = "none";
    document.getElementById("toc-open").style.display = "inline-block";
    document.getElementById("toc-close").style.display = "none";
}
showOpt = function () {
    document.getElementById("opt-ul").style.display = "block";
    document.getElementById("opt-open").style.display = "none";
    document.getElementById("opt-close").style.display = "inline-block";
}
hideOpt = function () {
    document.getElementById("opt-ul").style.display = "none";
    document.getElementById("opt-open").style.display = "inline-block";
    document.getElementById("opt-close").style.display = "none";
}
exportLogs = function () {
    let v = window.prompt("学年,組,出席番号で構成される4桁のIDを半角で入力してください。\n(例)5年1組3番:5103");
    if (v != null && v.match(/^[0-9]{4}$/)) {
        let blob = new Blob([JSON.stringify(logs)], { type: "text/plain" });
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
window.addEventListener("load", function () {
    try {
        for (let i in parts) {
            setOptions(i);
            drawCanvas(i);
        }
        for (let i in parts) {
            draw(i);
        }
    } catch (e) {
        document.getElementById("caution").innerHTML = "エラーが発生しました。リロードするかブラウザを変えてください。";
        document.getElementById("caution-detail").innerHTML = e;
    }
    createjs.Ticker.addEventListener("tick", function () {
        if (isAuto) {
            step(curId);
        }
        for (let i in stages) {
            stages[i].update();
        }
    });
    window.onbeforeunload = function (e) {
        if (isAddedLog) {
            e.returnValue = "活動記録がファイルに出力されていません。ページを閉じますか？";
        }
    }
});