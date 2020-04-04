window.addEventListener("load", function () {
    getLine = function (xArr, yArr, color) {
        let funcLine = new createjs.Shape();
        funcLine.graphics.setStrokeStyle(2);
        let posX0 = convertPosX(xArr[0]);
        let posY0 = convertPosY(yArr[0]);
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
    initAxis = function () {
        let bg = new createjs.Shape();
        bg.graphics.beginFill("white")
            .drawRect(0, 0, 1000, 500);
        stage.addChild(bg);
        let axis = new createjs.Shape();
        axis.graphics.beginStroke("gray")
            .moveTo(minX, middle)
            .lineTo(maxX, middle)
            .closePath()
            .moveTo(center, minY)
            .lineTo(center, maxY)
            .closePath();
        stage.addChild(axis);
        setAxisText("x", maxX, middle, "left", "middle");
        setAxisText("y", center, minY, "center", "bottom");
    }
    function setAxisText(str, x, y, align, baseline) {
        let text = new createjs.Text(str, "20px sans-serif", "black");
        text.x = x;
        text.y = y;
        text.textAlign = align;
        text.textBaseline = baseline;
        stage.addChild(text);
    }
    initFourier = function () {
        deg = 0;
        xArr = [];
        yArr = [];
        let y = an(0) / 2;
        //console.log(y);
        for (let x = -maxRX; x <= maxRX; x += delta) {
            xArr.push(x);
            yArr.push(y);
        }
        fourierLine = getLine(xArr, yArr, "red");
        stage.addChild(fourierLine);
        stage.addChild(tempLine);
        setDegText();
        resetFourierText();
        addFourierText("f(x)=" + y);
    }
    degUp = function () {
        if (degPart == 0) {
            deg++;
            let a = an(deg);
            for (let i = 0; i < xArr.length; i++) {
                y0Arr[i] = yArr[i];
                tempArr[i] = a * Math.cos(deg * xArr[i]);
                yArr[i] += tempArr[i];
            }
            degPart = 1;
            addFourierText((a > 0 ? "+" : "") + a + "\\cos{" + (deg > 1 ? deg : "") + "x}");
        }
        else if (degPart == 1) {
            let b = bn(deg);
            for (let i = 0; i < xArr.length; i++) {
                y0Arr[i] = yArr[i];
                tempArr[i] = b * Math.sin(deg * xArr[i]);
                yArr[i] += tempArr[i];
            }
            degPart = 0;
            addFourierText((b > 0 ? "+" : "") + b + "\\sin{" + (deg > 1 ? deg : "") + "x}");
        }
        isMoving = true;
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

        fourierLine = getLine(xArr, yMovingArr, "red");
        stage.addChild(fourierLine);
        if (moveCount < maxMove) {
            tempLine = getLine(xArr, tempMovingArr, "blue");
            stage.addChild(tempLine);
        }
        if (moveCount == 0) {
            interval += 15;
            setDegText();
        }
        moveCount++;
    }
    setDegText = function () {
        document.getElementById("fourierN").innerHTML = "(step " + deg + ")";
    }
    addFourierText = function (str) {
        document.getElementById("fourier").innerHTML += str;
    }
    resetFourierText = function () {
        document.getElementById("fourier").innerHTML = "";
    }
    convertPosX = function (x) {
        return center + (maxX - center) * (x / maxRX);
    }
    convertPosY = function (y) {
        return middle + (minY - middle) * (y / maxRY);
    }
    convertCalcX = function (x) {
        return maxRX * (x - center) / (maxX - center);
    }
    convertCalcY = function (y) {
        return maxRY * (y - middle) / (minY - middle);
    }
    onoff = function () {
        isTicking = !isTicking;
    }
    showTeX = function () {
        document.getElementById("fourier-tex").innerHTML = "\\(" + document.getElementById("fourier").innerHTML + "\\)";
    }
    prepareDraw = function () {
        drawStartArea = new createjs.Shape();
        drawStartArea.alpha = 0.5;
        drawStartArea.graphics.beginFill("yellow")
            .drawRect(0, 0, minX, 600);
        stage.addChild(drawStartArea);
        expText = new createjs.Text("←黄色エリアにカーソルを入れる←", "20px sans-serif", "darkred");
        expText.x = 75;
        expText.y = 200;
        stage.addChild(expText);
    }
    startDraw = function () {
        //console.log("startDraw");
        curX = 50;
        freeLine = new createjs.Shape();
        freeLine.graphics.beginStroke("black");
        freeLine.graphics.setStrokeStyle(2);
        stage.addChild(freeLine);
        expText.text = "→線を引く→";
    }
    calcAB = function () {
        stage.removeChild(drawStartArea);
        stage.removeChild(expText);
        for (let i = 0; i < freeXArr.length - 1; i++) {
            let x0 = freeXArr[i];
            let x1 = freeXArr[i + 1];
            let dx = x1 - x0;
            let y0 = freeYArr[i];
            let y1 = freeYArr[i + 1];
            let dy = y1 - y0;
            let divNum = Math.floor((x1 - x0) / delta + 1);
            for (let d = 0; d < divNum; d++) {
                funcXArr.push(x0 + dx * (d / divNum));
                funcYArr.push(y0 + dy * (d / divNum));
            }
        }
        funcXArr.push(freeXArr[freeXArr.length - 1]);
        funcYArr.push(freeYArr[freeYArr.length - 1]);
        //console.log(freeXArr.length + " -> " + funcXArr.length);
        initFourier();
        phase = "animate";
        //console.log("animate ready");
    }
    an = function (n) {
        let aval = 0;

        for (let i = 0; i < funcXArr.length - 1; i++) {
            let x0 = funcXArr[i];
            let x1 = funcXArr[i + 1];
            let y0 = funcYArr[i] * Math.cos(n * x0);
            let y1 = funcYArr[i + 1] * Math.cos(n * x1);
            //console.log(n, [x0, x1, y0, y1]);
            aval += (y0 + y1) * (x1 - x0) / 2;
            //console.log("aval=" + aval);
        }
        aval /= Math.PI;
        //console.log("a(" + deg + ")=" + aval);
        return aval;
    }
    bn = function (n) {
        let bval = 0;

        for (let i = 0; i < funcXArr.length - 1; i++) {
            let x0 = funcXArr[i];
            let x1 = funcXArr[i + 1];
            let y0 = funcYArr[i] * Math.sin(n * x0);
            let y1 = funcYArr[i + 1] * Math.sin(n * x1);
            //console.log(x0, x1, y0, y1);
            bval += (y0 + y1) * (x1 - x0) / 2;
            //console.log("bval=" + bval);
        }
        bval /= Math.PI;
        //console.log("b(" + deg + ")=" + bval);
        return bval;
    }
});