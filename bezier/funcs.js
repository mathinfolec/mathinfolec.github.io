window.addEventListener("load", function () {
    addPoint = function (x, y) {
        let p = new createjs.Shape();
        p.graphics.beginFill("red").drawCircle(0, 0, 10);
        p.x = x;
        p.y = y;
        stage.addChild(p);
        basePointArr.push(p);
        let text = new createjs.Text(basePointArr.length, "12px sans-serif", "white");
        text.textAlign = "center";
        text.textBaseline = "middle";
        text.x = x;
        text.y = y;
        stage.addChild(text);
    }
    initCalc = function () {
        pointArr.push(basePointArr);
        for (let i = 0; i < basePointArr.length - 2; i++) {
            let tmpArr = [];
            for (let j = 0; j < basePointArr.length - 1 - i; j++) {
                let p = new createjs.Shape();
                p.graphics.beginFill("blue").drawCircle(0, 0, 8);
                p.x = pointArr[i][j].x;
                p.y = pointArr[i][j].y;
                stage.addChild(p);
                tmpArr.push(p);
            }
            pointArr.push(tmpArr);
        }
        rI = pointArr.length - 1;
        resultPoint = new createjs.Shape();
        resultPoint.graphics.beginFill("yellow").drawCircle(0, 0, 10);
        resultPoint.x = pointArr[rI][0].x;
        resultPoint.y = pointArr[rI][0].y;
        stage.addChild(resultPoint);
        resultLine = new createjs.Shape();
        stage.addChild(resultLine);
        baseLine = new createjs.Shape();
        for (let i = 0; i < basePointArr.length - 1; i++) {
            baseLine.graphics.beginStroke("green")
                .moveTo(basePointArr[i].x, basePointArr[i].y)
                .lineTo(basePointArr[i + 1].x, basePointArr[i + 1].y);
        }
        stage.addChild(baseLine);
        phase = "animate";
        calc();
    }
    calc = function () {
        stage.removeChild(tmpLine);
        tmpLine = new createjs.Shape();
        for (let i = 1; i < pointArr.length; i++) {
            for (let j = 0; j < pointArr[i].length; j++) {
                pointArr[i][j].x = (1 - t) * pointArr[i - 1][j].x + t * pointArr[i - 1][j + 1].x;
                pointArr[i][j].y = (1 - t) * pointArr[i - 1][j].y + t * pointArr[i - 1][j + 1].y;
                if (j > 0) {
                    tmpLine.graphics.beginStroke("green")
                        .moveTo(pointArr[i][j - 1].x, pointArr[i][j - 1].y)
                        .lineTo(pointArr[i][j].x, pointArr[i][j].y)
                }
            }
        }
        stage.addChild(tmpLine);
        let rX = resultPoint.x;
        let rY = resultPoint.y;
        resultPoint.x = (1 - t) * pointArr[rI][0].x + t * pointArr[rI][1].x;
        resultPoint.y = (1 - t) * pointArr[rI][0].y + t * pointArr[rI][1].y;
        if (t == 0) {
            stage.removeChild(resultLine);
            resultLine = new createjs.Shape();
            resultLine.graphics.setStrokeStyle(2);
            stage.addChild(resultLine);
        }
        else {
            resultLine.graphics.beginStroke("yellow")
                .moveTo(rX, rY)
                .lineTo(resultPoint.x, resultPoint.y);
            if (t == 1) interval += 10;
        }
    }
    onoff = function () {
        if (phase == "click") {
            if (basePointArr.length > 1) initCalc();
            else window.alert("More than 2 points are required");

        }
        if (phase == "animate") {
            isTicking = !isTicking;
            console.log("isTicking:" + isTicking);
        }
    }
});
