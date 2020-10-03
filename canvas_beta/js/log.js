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
const exportLogs = function (isCopy = false) {
    let v = window.prompt("5桁のIDを入力してください。");
    if (v != null && v.match(/^[0-9]{5}$/)) {
        try {
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
            let rawStr = "id=" + v + ";logs=" + JSON.stringify(logs) + ";codes=" + JSON.stringify(codeArr) + ";";
            //console.log(rawStr);
            let exStr = rawStr;
            if (isCopy) {
                execCopy(rawStr);
                window.alert("ログをコピーしました。テキストファイルを自分で作成してからペーストしてください。")
            }
            else {
                let blob = new Blob([exStr], { type: "text/plain" });
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                let d = new Date();
                let dStr = (("0" + (d.getMonth() + 1)).slice(-2)) + (("0" + d.getDate()).slice(-2));
                link.download = "logs" + v + "_" + dStr + ".log";
                link.click();
                isAddedLog = false;
                window.alert("活動記録をダウンロードしました。");
            }
        } catch (e) {
            window.alert(e);
        }
    }
    else {
        window.alert("IDが正しくないためダウンロードできませんでした。");
    }
}
const execCopy = function (string) {
    // https://qiita.com/simiraaaa/items/2e7478d72f365aa48356
    // 空div 生成
    var tmp = document.createElement("div");
    // 選択用のタグ生成
    var pre = document.createElement('pre');

    // 親要素のCSSで user-select: none だとコピーできないので書き換える
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';

    tmp.appendChild(pre).textContent = string;

    // 要素を画面外へ
    var s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';

    // body に追加
    document.body.appendChild(tmp);
    // 要素を選択
    document.getSelection().selectAllChildren(tmp);

    // クリップボードにコピー
    var result = document.execCommand("copy");

    // 要素削除
    document.body.removeChild(tmp);

    return result;
}
const importLogs = function (str, adm) {
    let f0str = "'use strict';let id,logs,codes;"
    let f1str = "importSlot(codes);";
    let f2str = "setAdmin(logs);";
    let func;
    if (!(str.match(/^id=/))) {
        console.log("old version log");
        str = atob(str);
    }
    if (adm) {
        //console.log(atob(str));
        //func = Function(f0str + atob(str) + f1str + f2str);
        //console.log(str);
        func = Function(f0str + str + f1str + f2str);
        //console.log(func);
        func();
        addLog("import");
    }
    else {
        if (window.confirm("ログファイルを読み込みますか？ 現時点でシミュレータ上に書かれたコードはすべて上書きされます。")) {
            func = Function(f0str + str + f1str);
            func();
            addLog("import");
        }
    }
}