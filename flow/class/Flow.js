class Flow {
    #id;
    #title;
    #parts = {};
    #objs = {};
    #width = 0;
    #height = 0;
    #cId;
    #oId;
    #stage = null;
    #startId;
    #endId;
    #isDrawn = false;
    #fontSize = 16;
    #maxDepth = 0;
    #maxPadding = 0;
    #curpId;
    #execStr = "";
    #isAuto = false;
    constructor(id) {
        this.#id = id;
        this.#title = options[id].title;
        for (let i in parts[id]) {
            this.#parts[i] = {};
            for (let j in parts[id][i]) {
                this.#parts[i][j] = parts[id][i][j];
            }
            if (parts[id][i].type == "terminal-start") {
                this.#startId = i;
                this.#curpId = i;
            }
            else if (parts[id][i].type == "terminal-end") {
                this.#endId = i;
            }
        }
        this.#width = options[id].width;
        this.#height = options[id].height;
        this.#cId = this.getCanvasId(this.#id);
        this.#oId = this.getOutId(this.#id);
        this.preset();
        this.drawCanvas();
    }
    draw() {
        if (this.#isDrawn) {
            return;
        }
        this.#stage = new createjs.Stage(this.#cId);
        console.log("create stage " + this.#cId);
        let bg = new createjs.Shape();
        bg.graphics.beginFill("gray").drawRect(0, 0, this.#width, this.#height);
        this.#stage.addChild(bg);
        for (let i in this.#parts) {
            this.#objs[i] = this.getObj(i);
            this.#stage.addChild(this.#objs[i]);
        }
        console.log("finish initialization " + this.#id);
        this.#stage.update();
        this.#isDrawn = true;
    }
    preset() {
        let queue = [this.#startId];
        this.#parts[this.#startId].depth = 0;
        this.#parts[this.#startId].padding = 0;
        let maxDepth = 0;
        let maxPadding = 0;
        console.log(this.#parts);
        while (queue.length) {
            let id = queue.shift();
            let i;
            switch (this.#parts[id].type) {
                case "terminal-start":
                case "process":
                case "process-let":
                case "process-any":
                case "for-end":
                    i = this.#parts[id].next;
                    this.#parts[i].depth = this.#parts[id].depth + 1;
                    if (typeof this.#parts[i].padding == "undefined") {
                        this.#parts[i].padding = this.#parts[id].padding;
                    }
                    else {
                        this.#parts[i].padding = Math.min(this.#parts[i].padding, this.#parts[id].padding);
                    }
                    maxDepth = this.#parts[i].depth;
                    maxPadding = Math.max(maxPadding, this.#parts[i].padding);
                    queue.push(i);
                    break;
                case "for-range":
                    i = this.#parts[id].next;
                    this.#parts[i].depth = this.#parts[id].depth + 1;
                    if (typeof this.#parts[i].padding == "undefined") {
                        this.#parts[i].padding = this.#parts[id].padding;
                    }
                    else {
                        this.#parts[i].padding = Math.min(this.#parts[i].padding, this.#parts[id].padding);
                    } maxDepth = this.#parts[i].depth;
                    maxPadding = Math.max(maxPadding, this.#parts[i].padding);
                    queue.push(i);
                    // connect for-range and for-end
                    i = this.#parts[id].end;
                    this.#parts[i].start = id;
                    if (typeof this.#parts[i].padding == "undefined") {
                        this.#parts[i].padding = this.#parts[id].padding;
                    }
                    else {
                        this.#parts[i].padding = Math.min(this.#parts[i].padding, this.#parts[id].padding);
                    }
                    // set array for loop
                    let rangeStrArr = (this.#parts[id].name).trim().split("of");
                    this.#parts[id].prop = {
                        valName: rangeStrArr[0].trim(),
                        range: rangeStrArr[1].trim(),
                        isInited: true,
                        remains: Function("return " + rangeStrArr[1] + ";")()
                    };
                    console.log(this.#parts[id].prop);
                    break;
                case "if-else":
                    i = this.#parts[id].next[0];
                    this.#parts[i].depth = this.#parts[id].depth + 1;
                    if (typeof this.#parts[i].padding == "undefined") {
                        this.#parts[i].padding = this.#parts[id].padding;
                    }
                    else {
                        this.#parts[i].padding = Math.min(this.#parts[i].padding, this.#parts[id].padding);
                    }
                    queue.push(i);
                    i = this.#parts[id].next[1];
                    if (i == this.#parts[id].conv) {
                        this.#parts[i].depth = this.#parts[id].depth + 2;
                        if (typeof this.#parts[i].padding == "undefined") {
                            this.#parts[i].padding = this.#parts[id].padding;
                        }
                        else {
                            this.#parts[i].padding = Math.min(this.#parts[i].padding, this.#parts[id].padding);
                        }
                    }
                    else {
                        this.#parts[i].depth = this.#parts[id].depth + 1;
                        if (typeof this.#parts[i].padding == "undefined") {
                            this.#parts[i].padding = this.#parts[id].padding + 1;
                        }
                        else {
                            this.#parts[i].padding = Math.min(this.#parts[i].padding, this.#parts[id].padding + 1);
                        }
                    }
                    maxDepth = this.#parts[i].depth;
                    maxPadding = Math.max(maxPadding, this.#parts[i].padding);
                    queue.push(i);
                    break;
                case "terminal-end":
                    break;
            }
            console.log(id + "," + this.#parts[id].padding);
        }
        this.#maxDepth = maxDepth;
        this.#maxPadding = maxPadding;
        console.log("maxPadding=" + maxPadding);
    }
    getObj(pId) {
        this.#parts[pId].x = this.getX(this.#parts[pId].padding);
        this.#parts[pId].y = this.getY(this.#parts[pId].depth);
        this.#parts[pId].w = 150;
        this.#parts[pId].h = this.getH();
        let data = this.#parts[pId];
        let c = new createjs.Container();
        let s = new createjs.Shape();
        let t = new createjs.Text("", this.#fontSize + "px monospace", "black");
        let input;
        let tId;
        let wRate = 1.3;
        switch (data.type) {
            case "terminal-start":
            case "terminal-end":
                s.graphics.beginFill("pink").drawRect(0, 0, data.w, data.h);
                t.text = data.name;
                break;
            case "process-let":
                s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
                t.text = "let " + data.prop.valName + " =     ";
                input = document.createElement("input");
                tId = this.getInputId(this.#id, pId);
                input.id = tId;
                input.setAttribute("type", "text");
                if (data.prop.initVal != null) {
                    input.setAttribute("value", data.prop.initVal);
                }
                input.style.position = "absolute";
                document.getElementById(this.getCanvasAreaId(this.#id)).appendChild(input);
                document.getElementById(tId).style.top = (data.y + (data.h - this.#fontSize * wRate) / 2) + "px";
                document.getElementById(tId).style.left = (data.x + data.w / 2 + (t.text.length / 2 - 4) * this.#fontSize / 2) + "px";
                document.getElementById(tId).style.width = (this.#fontSize * 3 / 2) + "px";
                document.getElementById(tId).style.height = this.#fontSize + "px";
                break;
            case "process-any":
                s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
                t.text = "          ";
                input = document.createElement("input");
                tId = this.getInputId(this.#id, pId);
                input.id = tId;
                input.setAttribute("type", "text");
                if (typeof data.prop.defValue != "undefined") {
                    input.setAttribute("value", data.prop.defValue);
                }
                input.style.position = "absolute";
                document.getElementById(this.getCanvasAreaId(this.#id)).appendChild(input);
                document.getElementById(tId).style.top = (data.y + (data.h - this.#fontSize * wRate) / 2) + "px";
                document.getElementById(tId).style.left = (data.x + data.w / 2 - (t.text.length / 2) * this.#fontSize / 2) + "px";
                document.getElementById(tId).style.width = (this.#fontSize * t.text.length / 2) + "px";
                document.getElementById(tId).style.height = this.#fontSize + "px";
                break;
            case "if-else":
                s.graphics.beginFill("green").drawRect(0, 0, data.w, data.h);
                t.text = "if(" + data.name + ")";
                break;
            case "for-range":
                s.graphics.beginFill("lightblue").drawRect(0, 0, data.w, data.h);
                t.text = "for(" + data.name + ")";
                break;
            case "for-end":
                s.graphics.beginFill("lightblue").drawRect(0, 0, data.w, data.h);
                t.text = "";
                break;
            default:
                s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
                t.text = data.name;
                break;
        }
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.x = data.w / 2;
        t.y = data.h / 2;
        c.addChild(s);
        c.addChild(t);
        c.x = data.x;
        c.y = data.y;
        console.log(pId + "," + data.depth);
        return c;
    }
    getCanvasId(id) {
        return id + "_canvas";
    }
    getOutId(id) {
        return id + "_out";
    }
    getCanvasAreaId(id) {
        return id + "_canvasdiv";
    }
    getInputId(id, pId) {
        return id + "_input_" + pId;
    }
    getCodeId(id) {
        return id + "_code";
    }
    getX(padding) {
        return 20 + padding * (this.getW() + 20);
    }
    getY(depth) {
        return 20 + depth * this.#fontSize * 4;
    }
    getW() {
        return 150;
    }
    getH() {
        return this.#fontSize * 2;
    }
    drawCanvas() {
        this.#width = this.getX(this.#maxPadding) + this.getW() + 20;
        this.#height = this.getY(this.#maxDepth) + this.getH() + 20;
        document.getElementById("main").innerHTML += "<div id='" + this.#id + "'></div><div class='clear'><hr/>";
        let d = document.getElementById(this.#id);
        d.innerHTML = "<h2>" + this.#title + "</h2>";
        d.innerHTML += "<div id='" + this.getCanvasAreaId(this.#id) + "' style='position: relative;'></div>";
        d.innerHTML += "<canvas width=" + this.#width + " height=" + this.#height + " id='" + this.#cId + "'></canvas></div>";
        d.innerHTML += "<button onclick=\"execFunc('" + this.#id + "')\">一括実行</button>";
        d.innerHTML += "<button onclick=\"stepFunc('" + this.#id + "')\">１ステップ</button>";
        d.innerHTML += "<button onclick=\"autoFunc('" + this.#id + "')\">オートステップ</button>";
        d.innerHTML += "<button onclick=\"resetFunc('" + this.#id + "')\">リセット</button>";
        d.innerHTML += "<div id='" + this.#oId + "' class='out'></div>";
        document.getElementById(this.#oId).style.height = (this.#height - 30) + "px";
    }
    getFunc(str = "") {
        return Function("\"use strict\";" + str + ";");
    }
    clearOut(id) {
        document.getElementById(this.getOutId(id)).innerHTML = "";
    }
    getExecStr(fromId, toId) {
        //console.log("getExecStr(" + fromId + "," + toId + ")");
        let s = "";
        let pId = fromId;
        while (pId != toId) {
            //console.log("this.#parts[" + id + "].name=" + this.#parts[id].name);
            switch (this.#parts[pId].type) {
                case "process":
                    s += this.#parts[pId].name + ";";
                    pId = this.#parts[pId].next;
                    break;
                case "if-else":
                    s += "if(" + this.#parts[pId].name + "){";
                    s += this.getExecStr(this.#parts[pId].next[0], this.#parts[pId].conv);
                    s += "}else{";
                    s += this.getExecStr(this.#parts[pId].next[1], this.#parts[pId].conv);
                    s += "}";
                    pId = this.#parts[pId].conv;
                    break;
                case "terminal-start":
                    pId = this.#parts[pId].next;
                    break;
                case "process-let":
                    s += "let " + this.#parts[pId].prop.valName + " = " + document.getElementById(this.getInputId(this.#id, pId)).value + ";";
                    pId = this.#parts[pId].next;
                    break;
                case "process-any":
                    s += document.getElementById(this.getInputId(this.#id, pId)).value + ";";
                    pId = this.#parts[pId].next;
                    break;
                case "for-range":
                    s += "for(" + this.#parts[pId].name + "){";
                    pId = this.#parts[pId].next;
                    break;
                case "for-end":
                    s += "}";
                    pId = this.#parts[pId].next;
                    break;
                default:
                    window.alert("undefined type");
                    return;
            }
        }
        return s;
    }
    exec() {
        main.setCurId(this.#id);
        this.clearOut(this.#id);
        try {
            let s = this.getExecStr(this.#startId, this.#endId);
            console.log(s);
            let f = this.getFunc(this.getExecStr(this.#startId, this.#endId));
            return f();
        } catch (e) {
            //window.alert(e);
            console.log(e);
            print(e);
        }
    }
    step() {
        main.setCurId(this.#id);
        console.log("step:" + this.#curpId);
        let data = this.#parts[this.#curpId];
        let f;
        let isCont = true;
        this.clearOut(this.#id);
        for (let i in this.#objs) {
            this.#objs[i].alpha = (i == this.#curpId ? 1 : 0.5);
        }
        switch (data.type) {
            case "terminal-start":
                this.#execStr = "\"use strict\";";
                this.#curpId = data.next;
                break;
            case "terminal-end":
                isCont = false;
                break;
            case "process":
                this.#execStr += data.name + ";";
                this.#curpId = data.next;
                break;
            case "process-let":
                this.#execStr += "let " + data.prop.valName + "=" + document.getElementById(this.getInputId(this.#id, this.#curpId)).value + ";";
                this.#curpId = data.next;
                break;
            case "process-any":
                this.#execStr += document.getElementById(this.getInputId(this.#id, this.#curpId)).value + ";";
                this.#curpId = data.next;
                break;
            case "if-else":
                f = Function(this.#execStr + "return (" + data.name + ");");
                if (f()) {
                    this.#curpId = data.next[0];
                }
                else {
                    this.#curpId = data.next[1];
                }
                break;
            case "for-range":
                if (!data.prop.isInited) {
                    this.#parts[this.#curpId].prop.remains = Function("return " + this.#parts[this.#curpId].prop.range + ";")();
                    this.#parts[this.#curpId].prop.isInited = true;
                }
                this.#execStr += data.prop.valName + "=" + data.prop.remains.shift() + ";";
                this.#curpId = data.next;
                break;
            case "for-end":
                if (this.#parts[data.start].prop.remains.length) {
                    this.#curpId = data.start;
                }
                else {
                    this.#curpId = data.next;
                }
                break;
        }
        //console.log(this.#execStr);
        f = Function(this.#execStr);
        if (data.type != "if-else") {
            f();
        }
        return isCont;
    }
    initStep() {
        for (let i in this.#objs) {
            this.#objs[i].alpha = 1;
        }
    }
    resetStep() {
        this.#curpId = this.#startId;
        this.#execStr = "\"use strict\";";
        this.clearOut(this.#id);
        this.#isAuto = false;
        for (let i in this.#parts) {
            if (this.#parts[i].type == "for-range") {
                this.#parts[i].prop.isInited = false;
                this.#parts[i].prop.remains = [];
            }
        }
        this.initStep();
    }
    autoStep() {
        this.#isAuto = !this.#isAuto;
    }
    update() {
        if (this.#isAuto) {
            this.#isAuto = this.step();
        }
        this.#stage.update();
    }
    getId() {
        return this.#id;
    }
}