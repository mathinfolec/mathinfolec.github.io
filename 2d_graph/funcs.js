window.addEventListener("load", function () {
    initButton = function () {
        for (let i = 0; i < phaseStrs.length; i++) {
            let h = new createjs.Shape();
            h.graphics.beginFill("red")
                .drawRect(0, 0, buttonX + 20, buttonY + 20);
            h.x = 790;
            h.y = 50 + i * 75;
            h.alpha = 0;
            stage.addChild(h);
            let b = new createjs.Shape();
            b.graphics.beginFill("green")
                .drawRect(0, 0, buttonX, buttonY);
            b.x = h.x + 10;
            b.y = h.y + 10;
            stage.addChild(b);
            let t = new createjs.Text(phaseStrs[i], "30px sans-serif", "white");
            t.textAlign = "center";
            t.textBaseline = "middle";
            t.x = b.x + buttonX / 2;
            t.y = b.y + buttonY / 2;
            stage.addChild(t);
            buttons.push({ obj: b, highlight: h, text: t });
        }
        highlightButton();
    }
    highlightButton = function () {
        for (let i = 0; i < buttons.length; i++) {
            let h = buttons[i].highlight;
            h.alpha = (i == phase ? 1 : 0);
        }
    }
    addPoint = function (x, y) {
        if (20 <= x && x <= 780 && 20 <= y && y <= 480) {
            for (let i = 0; i < points.length; i++) {
                let p = points[i];
                if (dist(p.obj.x, x, p.obj.y, y) < pointR * 2) return -1;
            }
            let p = new createjs.Shape();
            p.graphics.beginFill("red")
                .drawCircle(0, 0, pointR);
            p.x = x;
            p.y = y;
            stage.addChild(p);
            let t = new createjs.Text(points.length + 1, (pointR * 1.2) + "px sans-serif", "white");
            t.textAlign = "center";
            t.textBaseline = "middle";
            t.x = x;
            t.y = y;
            stage.addChild(t);
            points.push({ obj: p, text: t, connection: [] });
            return points.length - 1;
        }
        return -1;
    }
    getPointId = function (x, y) {
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            if (dist(p.obj.x, x, p.obj.y, y) < pointR) return i;
        }
        return -1;
    }

    setLine = function (x, y) {
        let p1Id = getPointId(x, y);
        if (p1Id == -1) return;
        if (p0Id == -1) p0Id = p1Id;
        else {
            setConnection(p0Id, p1Id)
            drawLine();
            p0Id = -1;
        }
    }
    setConnection = function (i, j) {
        if (j < i) {
            let tmp = j;
            j = i;
            i = tmp;
        }
        let ppos = points[i].connection.indexOf(j);
        if (ppos == -1) points[i].connection.push(j);
        else points[i].connection.splice(ppos, 1);

    }
    drawLine = function () {
        stage.removeChild(line);
        line = new createjs.Shape();
        for (let i = 0; i < points.length; i++) {
            let p0 = points[i];
            for (let j = 0; j < p0.connection.length; j++) {
                let p1 = points[p0.connection[j]];
                line.graphics.beginStroke("yellow")
                    .moveTo(p0.obj.x, p0.obj.y)
                    .lineTo(p1.obj.x, p1.obj.y);
            }
        }
        stage.addChild(line);
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            stage.removeChild(p.obj);
            stage.removeChild(p.text);
            stage.addChild(p.obj);
            stage.addChild(p.text);
        }
    }
    movePoint = function (x, y) {
        if (0 <= movingPointId && movingPointId < points.length) {
            movingPointId = -1;
        }
        else {
            let id = getPointId(x, y);
            if (id == -1) return;
            movingPointId = id;
        }
    }
    dividePoint = function (x, y) {
        let p1Id = getPointId(x, y);
        if (p1Id == -1) return;
        if (p0Id == -1) p0Id = p1Id;
        else {
            let p0 = points[p0Id].obj;
            let p1 = points[p1Id].obj;
            if (isConnect(p0Id, p1Id)) {
                let newId = addPoint((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
                if (newId >= 0) {
                    setConnection(p0Id, p1Id);
                    setConnection(p0Id, newId);
                    setConnection(p1Id, newId);
                    drawLine();
                }
            }

            p0Id = -1;
        }
    }
    removePoint = function (x, y) {
        let id = getPointId(x, y);
        if (id == -1) return;
        for (let i = 0; i < points.length; i++) {
            if (i == id) continue;
            let p = points[i];
            if (p.text.text > id) p.text.text = p.text.text = p.text.text - 1;
            for (let j = 0; j < p.connection.length; j++) {
                if (p.connection[j] > id) p.connection[j]--;
            }
        }
        stage.removeChild(points[id].obj);
        stage.removeChild(points[id].text);
        points.splice(id, 1);
        drawLine();
    }
    isConnect = function (i, j) {
        if (j < i) {
            let tmp = i;
            i = j;
            j = tmp;
        }
        return (points[i].connection.indexOf(j) >= 0)
    }
    dist = function (x0, x1, y0, y1) {
        return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    }
});
