const setup = function () {
    addLog("open");
    stage = new createjs.Stage("canvas");
    bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, w, h);
    bg.x = 0;
    bg.y = 0;
    stage.addChild(bg);
    let d = getSpanLoadButtonsId();
    for (let i = 1; i <= maxSlot; ++i) {
        let b = document.createElement("button");
        b.id = "button_load_" + i;
        b.setAttribute("onclick", "clickLoad(" + i + ")");
        b.innerHTML = i;
        d.appendChild(b);
    }
    changeSlot(1);
    init();
}