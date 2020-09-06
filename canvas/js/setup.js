const setup = function () {
    stage = new createjs.Stage("canvas");
    bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, w, h);
    bg.x = 0;
    bg.y = 0;
    stage.addChild(bg);
    prevURLStr = location.href;
    setupSlots();
    setupSamples();
    init();
    addLog("open", prevURLStr);
}