function print(x) {
    document.getElementById(Flow.getOutId(curId)).innerHTML += x + "<br/>";
}
function execFunc(id) {
    console.log("execFunc(" + id + ")");
    main.exec(id);
}
function range(a, b, c) {
    let arr = [];
    for (let i = a; i < b; i += c) {
        arr.push(i);
    }
    return arr;
}
window.addEventListener("load", function () {
    main = new Main();
    createjs.Ticker.addEventListener("tick", function () {
        main.update();
    });
});