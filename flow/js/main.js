function print(x = "") {
    document.getElementById(getOutId(curId)).innerHTML += x + "<br/>";
}
function setCurId(id) {
    curId = id;
}
function range(a, b) {
    let arr = [];
    for (let i = a; i < b; i++) {
        arr.push(i);
    }
    return arr;
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
        document.getElementById("caution").innerHTML = "※動作環境を満たしていません※";
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