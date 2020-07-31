function print(x) {
    document.getElementById(Flow.getOutId(curId)).innerHTML += x + "<br/>";
}
function execFunc(id) {
    console.log("execFunc(" + id + ")");
    main.exec(id);
}
window.addEventListener("load", function () {
    main = new Main();
    createjs.Ticker.addEventListener("tick", function () {
        main.update();
    });
});