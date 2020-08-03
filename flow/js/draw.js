draw = function (id) {
    stages[id] = new createjs.Stage(getCanvasId(id));
    console.log("create stage " + getCanvasId(id));
    let bg = new createjs.Shape();
    bg.graphics.beginFill("gray").drawRect(0, 0, options[id].width, options[id].height);
    stages[id].addChild(bg);
    objs[id] = {};
    for (let i in parts[id]) {
        objs[id][i] = getObj(id, i);
        // stage.addChild() comes later
        // stages[id].addChild(objs[id][i]);
    }
    let queue = [];
    let dones = [];
    queue.push(options[id].startId);
    while (queue.length) {
        let i = queue.shift();
        let ni;
        if (parts[id][i].type == "terminal-end") {
            continue;
        }
        else if (parts[id][i].type == "if-else" || parts[id][i].type == "if-blank") {
            ni = parts[id][i].next[0];
            drawLine(id, i, ni, true);
            if (dones.indexOf(ni) < 0 && queue.indexOf(ni) < 0) {
                queue.push(ni);
            }
            ni = parts[id][i].next[1];
            drawLine(id, i, ni, false);
            if (dones.indexOf(ni) < 0 && queue.indexOf(ni) < 0) {
                queue.push(ni);
            }
        }
        else {
            ni = parts[id][i].next;
            drawLine(id, i, ni);
            if (dones.indexOf(ni) < 0 && queue.indexOf(ni) < 0) {
                queue.push(ni);
            }
        }
        dones.push(i);
    }
    for (let i in parts[id]) {
        stages[id].addChild(objs[id][i]);
    }
    document.getElementById(getExpId(id)).innerHTML = options[id].exp;
    console.log("finish initialization " + id);
    stages[id].update();
}
drawLine = function (id, fpId, tpId, tf = null) {
    let fd = parts[id][fpId].depth;
    let td = parts[id][tpId].depth;
    let fp = parts[id][fpId].padding;
    let tp = parts[id][tpId].padding;
    let l = new createjs.Shape();
    let b = null;
    let t = null;
    if (tf != null) {
        b = new createjs.Shape();
        b.graphics.beginFill("white").drawRoundRect(0, 0, fontSize * 4, fontSize * 1.2, fontSize * 0.5, fontSize * 0.5);
        b.alpha = 0.6;
        if (tf) {
            t = new createjs.Text("true", fontSize + "px sans-serif", "red");
        }
        else {
            t = new createjs.Text("false", fontSize + "px sans-serif", "blue");
        }
        t.textAlign = "center";
        t.textBaseline = "middle";
    }
    l.graphics.setStrokeStyle(1);
    if (fp == tp) {
        l.graphics.beginStroke("black")
            .moveTo(getX(fp) + getW() / 2, getY(fd) + getH() / 2)
            .lineTo(getX(tp) + getW() / 2, getY(td) + getH() / 2);
        if (tf != null) {
            t.x = getX(fp) + getW() / 4;
            t.y = (getY(fd) + getH() + getY(td)) / 2;
        }
    }
    else if (fp > tp) {
        l.graphics.beginStroke("black")
            .moveTo(getX(fp) + getW() / 2, getY(fd) + getH() / 2)
            .lineTo(getX(fp) + getW() / 2, getY(td) + getH() / 2)
            .lineTo(getX(tp) + getW() / 2, getY(td) + getH() / 2);
        if (tf != null) {
            t.x = getX(fp) + getW() / 2;
            t.y = getY(fd);
        }
    }
    else if (fp < tp) {
        l.graphics.beginStroke("black")
            .moveTo(getX(fp) + getW() / 2, getY(fd) + getH() / 2)
            .lineTo(getX(tp) + getW() / 2, getY(fd) + getH() / 2)
            .lineTo(getX(tp) + getW() / 2, getY(td) + getH() / 2);
        if (tf != null) {
            t.x = (getX(fp) + getW() + getX(tp) + getW() / 2) / 2;
            t.y = getY(fd);
        }
    }
    l.alpha = 0.8;
    stages[id].addChild(l);
    if (tf != null) {
        b.x = t.x - fontSize * 2;
        b.y = t.y - fontSize * 1.2 / 2;
        stages[id].addChild(b);
        stages[id].addChild(t);
    }
}