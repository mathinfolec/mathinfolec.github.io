function print(x) {
    document.getElementById(main.getCurOutId()).innerHTML += x + "<br/>";
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
    main = new Main();
    console.log(main);
    createjs.Ticker.addEventListener("tick", function () {
        main.update();
    });
});