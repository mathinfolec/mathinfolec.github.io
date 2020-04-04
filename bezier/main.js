window.addEventListener("load", function () {
    stage = new createjs.Stage("canvas");
    let bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, width, height);
    stage.addChild(bg);
    tmpLine = new createjs.Shape();
    stage.addChild(tmpLine);
    resultLine = new createjs.Shape();
    stage.addChild(resultLine);
    phase = "click";
});
