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
});