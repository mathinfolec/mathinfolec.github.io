window.addEventListener("load", function () {
    stage = new createjs.Stage("canvas");
    let bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, maxX - minX, maxY - minY);
    bg.x = minX;
    bg.y = minY;
    stage.addChild(bg);
    line = new createjs.Shape();
    stage.addChild(line);
    phase = 0;
    initButton();
});
