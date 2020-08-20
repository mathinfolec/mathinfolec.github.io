const setup = function () {
    addLog("open");
    stage = new createjs.Stage("canvas");
    bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, w, h);
    bg.x = 0;
    bg.y = 0;
    stage.addChild(bg);
    init();
}