window.addEventListener("load", function () {
    getLine = function (xArr, yArr, color) {
        let funcLine = new createjs.Shape();
        funcLine.graphics.setStrokeStyle(2);
        let posX0 = convertPosX(xArr[0]);
        let posY0 = convertPosX(yArr[0]);
        let posX1;
        let posY1;
        for (let i = 1; i < xArr.length; ++i) {
            posX1 = convertPosX(xArr[i]);
            posY1 = convertPosY(yArr[i]);
            funcLine.graphics.beginStroke(color)
                .moveTo(posX0, posY0)
                .lineTo(posX1, posY1);
            posX0 = posX1;
            posY0 = posY1;
        }
        return funcLine;
    }
    initFourier = function () {
        let axis = new createjs.Shape();
        axis.graphics.beginStroke("black")
            .moveTo(minX, middle)
            .lineTo(maxX, middle)
            .closePath()
            .moveTo(center, minY)
            .lineTo(center, maxY)
            .closePath();
        stage.addChild(axis);
        deg = 0;
        for (let x = -maxR; x <= maxR; x += delta) {
            let y = 0;
            xArr.push(x);
            yArr.push(y);
        }
        fourierLine = getLine(xArr, yArr, "blue");
        stage.addChild(fourierLine);
        stage.addChild(tempLine);
        setFourierText();
    }
    degUp = function () {
        deg++;
        for (let i = 0; i < xArr.length; i++) {
            y0Arr[i] = yArr[i];
            tempArr[i] = fourier(xArr[i], deg);
            yArr[i] += tempArr[i];
        }
        isMoving = true;
        //console.log("degUp(" + deg + ")");
    }
    moveLine = function () {
        if (moveCount > maxMove) {
            isMoving = false;
            moveCount = 0;
            return;
        }
        let yMovingArr = [];
        let tempMovingArr = [];
        for (i = 0; i < xArr.length; i++) {
            yMovingArr[i] = y0Arr[i] + (yArr[i] - y0Arr[i]) * (moveCount / maxMove);
            tempMovingArr[i] = tempArr[i] + (yArr[i] - tempArr[i]) * (moveCount / maxMove);
        }
        stage.removeChild(tempLine);
        stage.removeChild(fourierLine);

        fourierLine = getLine(xArr, yMovingArr, "blue");
        tempLine = getLine(xArr, tempMovingArr, "red");
        stage.addChild(tempLine);
        stage.addChild(fourierLine);

        //console.log("moveLine(" + moveCount + ")");
        if (moveCount == 0) {
            interval += 15;
            setFourierText();
        }
        moveCount++;
    }
    fourier = function (x, deg) {
        return 2 * ((-1) ** (deg - 1)) * Math.sin(deg * x) / deg;
    }
    setFourierText = function () {
        document.getElementById("fourierN").innerHTML = "(n=" + deg + ")";
    }
    convertPosX = function (x) {
        return center + (maxX - center) * (x / maxR);
    }
    convertPosY = function (y) {
        return middle + (minY - middle) * (y / maxR);
    }
    onoff = function () {
        isTicking = !isTicking;
    }
});