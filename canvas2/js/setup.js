const setup = function () {
    let a = location.href.split("?");
    if (a.length > 1) {
        location.href = a[0];
    }
    //stage = new createjs.Stage("canvas2");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    /*
    bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, c_width, c_height);
    bg.x = 0;
    bg.y = 0;
    stage.addChild(bg);
    **/
    prevURLStr = location.href;
    setupSlots();
    setupSamples();
    init();
    addLog("open", prevURLStr);
}