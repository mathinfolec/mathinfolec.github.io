function print(x = "") {
    main.print(x);
}
function updateVals(vals) {
    main.updateVals(vals);
}
function execFunc(id) {
    console.log("execFunc(" + id + ")");
    main.exec(id);
}
function stepFunc(id) {
    main.step(id);
}
function resetFunc(id) {
    main.resetStep(id);
}
function autoFunc(id) {
    main.autoStep(id);
}
function range(a, b, c) {
    let arr = [];
    for (let i = a; i < b; i += c) {
        arr.push(i);
    }
    console.log(arr);
    return arr;
}
window.addEventListener("load", function () {
    try {
        main = new Main();
        console.log(main);
    } catch (e) {
        document.getElementById("caution").innerHTML = "※動作環境を満たしていません※";
        document.getElementById("caution-detail").innerHTML = e;
    }
    createjs.Ticker.addEventListener("tick", function () {
        main.update();
    });
});