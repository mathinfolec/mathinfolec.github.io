class Flow {
    #id;
    #title;
    #parts = {};
    #objs = {};
    #width = 0;
    #height = 0;
    #cId;
    #vId;
    #oId;
    #stage = null;
    #startId;
    #endId;
    #isDrawn = false;
    #fontSize = 16;
    #maxDepth = 0;
    #maxPadding = 0;
    #curpId;
    #isAuto = false;
    #vals = [];
    #curVals = {};
    constructor(id) {
        this.#id = id;
        this.#title = options[id].title;
        if (typeof options[id].vals != "undefined") {
            for (let i in options[id].vals) {
                this.#vals.push(options[id].vals[i]);
            }
        }
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
        this.#cId = this.getCanvasId();
        this.#vId = this.getValsId();
        this.#oId = this.getOutId();
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
        let queue = [];
        queue.push(this.#startId);
        while (queue.length) {
            let i = queue.shift();
            let ni;
            if (this.#parts[i].type == "terminal-end") {
                continue;
            }
            else if (this.#parts[i].type == "if-else" || this.#parts[i].type == "if-blank") {
                ni = this.#parts[i].next[0];
                this.drawLine(i, ni, true);
                queue.push(ni);
                ni = this.#parts[i].next[1];
                this.drawLine(i, ni, false);
                queue.push(ni);
            }
            else {
                ni = this.#parts[i].next;
                this.drawLine(i, ni);
                queue.push(ni);
            }
        }
        console.log("finish initialization " + this.#id);
        this.#stage.update();
        this.#isDrawn = true;
    }
    drawLine(fpId, tpId, tf = null) {
        let fd = this.#parts[fpId].depth;
        let td = this.#parts[tpId].depth;
        let fp = this.#parts[fpId].padding;
        let tp = this.#parts[tpId].padding;
        let l = new createjs.Shape();
        let b = null;
        let t = null;
        if (tf != null) {
            b = new createjs.Shape();
            b.graphics.beginFill("white").drawRect(0, 0, this.#fontSize * 4, this.#fontSize * 1.2);
            b.alpha = 0.6;
            if (tf) {
                t = new createjs.Text("true", this.#fontSize + "px sans-serif", "red");
            }
            else {
                t = new createjs.Text("false", this.#fontSize + "px sans-serif", "blue");
            }
            t.textAlign = "center";
            t.textBaseline = "middle";
        }
        l.graphics.setStrokeStyle(1);
        if (fp == tp) {
            l.graphics.beginStroke("black")
                .moveTo(this.getX(fp) + this.getW() / 2, this.getY(fd) + this.getH())
                .lineTo(this.getX(tp) + this.getW() / 2, this.getY(td));
            if (tf != null) {
                t.x = this.getX(fp) + this.getW() / 2;
                t.y = (this.getY(fd) + this.getH() + this.getY(td)) / 2;
            }
        }
        else if (fp > tp) {
            l.graphics.beginStroke("black")
                .moveTo(this.getX(fp) + this.getW() / 2, this.getY(fd) + this.getH())
                .lineTo(this.getX(fp) + this.getW() / 2, this.getY(td) + this.getH() / 2)
                .lineTo(this.getX(tp) + this.getW(), this.getY(td) + this.getH() / 2);
            if (tf != null) {
                t.x = this.getX(fp) + this.getW() / 2;
                t.y = (this.getY(fd) + this.getH() + this.getY(td) + this.getH() / 2) / 2;
            }
        }
        else if (fp < tp) {
            l.graphics.beginStroke("black")
                .moveTo(this.getX(fp) + this.getW(), this.getY(fd) + this.getH() / 2)
                .lineTo(this.getX(tp) + this.getW() / 2, this.getY(fd) + this.getH() / 2)
                .lineTo(this.getX(tp) + this.getW() / 2, this.getY(td));
            if (tf != null) {
                t.x = (this.getX(fp) + this.getW() + this.getX(tp) + this.getW() / 2) / 2;
                t.y = this.getY(fd) + this.getH() / 2;
            }
        }

        this.#stage.addChild(l);
        if (tf != null) {
            b.x = t.x - this.#fontSize * 2;
            b.y = t.y - this.#fontSize * 1.2 / 2;
            this.#stage.addChild(b);
            this.#stage.addChild(t);
        }
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
                case "if-blank":
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
        }
        this.#maxDepth = maxDepth;
        this.#maxPadding = maxPadding;
        console.log("maxPadding=" + maxPadding);
    }
    getObj(pId) {
        this.#parts[pId].x = this.getX(this.#parts[pId].padding);
        this.#parts[pId].y = this.getY(this.#parts[pId].depth);
        this.#parts[pId].w = this.getW();
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
                tId = this.getInputId(pId);
                input.id = tId;
                input.setAttribute("type", "text");
                if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
                    input.setAttribute("value", data.prop.initVal);
                }
                else {
                    input.setAttribute("value", 0);
                }
                input.style.position = "absolute";
                document.getElementById(this.getCanvasAreaId()).appendChild(input);
                document.getElementById(tId).style.top = (data.y + (data.h - this.#fontSize * wRate) / 2) + "px";
                document.getElementById(tId).style.left = (data.x + data.w / 2 + (t.text.length / 2 - 4) * this.#fontSize / 2) + "px";
                document.getElementById(tId).style.width = (this.#fontSize * 3 / 2) + "px";
                document.getElementById(tId).style.height = this.#fontSize + "px";
                break;
            case "process-any":
                s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
                t.text = "                  ";
                input = document.createElement("input");
                tId = this.getInputId(pId);
                input.id = tId;
                input.setAttribute("type", "text");
                if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
                    input.setAttribute("value", data.prop.initVal);
                }
                else {
                    input.setAttribute("value", "");
                }
                input.style.position = "absolute";
                document.getElementById(this.getCanvasAreaId()).appendChild(input);
                document.getElementById(tId).style.top = (data.y + (data.h - this.#fontSize * wRate) / 2) + "px";
                document.getElementById(tId).style.left = (data.x + data.w / 2 - (t.text.length / 2) * this.#fontSize / 2) + "px";
                document.getElementById(tId).style.width = (this.#fontSize * t.text.length / 2) + "px";
                document.getElementById(tId).style.height = this.#fontSize + "px";
                break;
            case "if-else":
                s.graphics.beginFill("lightgreen").drawRect(0, 0, data.w, data.h);
                t.text = "if(" + data.name + ")";
                break;
            case "if-blank":
                s.graphics.beginFill("lightgreen").drawRect(0, 0, data.w, data.h);
                t.text = "if(            )";
                input = document.createElement("input");
                tId = this.getInputId(pId);
                input.id = tId;
                input.setAttribute("type", "text");
                if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
                    input.setAttribute("value", data.prop.initVal);
                }
                else {
                    input.setAttribute("value", "true");
                }
                input.style.position = "absolute";
                document.getElementById(this.getCanvasAreaId()).appendChild(input);
                document.getElementById(tId).style.top = (data.y + (data.h - this.#fontSize * wRate) / 2) + "px";
                document.getElementById(tId).style.left = (data.x + data.w / 2 - 5 * this.#fontSize / 2) + "px";
                document.getElementById(tId).style.width = (this.#fontSize * 10 / 2) + "px";
                document.getElementById(tId).style.height = this.#fontSize + "px";
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
        return c;
    }
    getCanvasId() {
        return this.#id + "_canvas";
    }
    getValsId() {
        return this.#id + "_vals";
    }
    getOutId() {
        return this.#id + "_out";
    }
    getCanvasAreaId() {
        return this.#id + "_canvasdiv";
    }
    getInputId(pId) {
        return this.#id + "_input_" + pId;
    }
    getInput(pId) {
        return document.getElementById(this.getInputId(pId)).value;
    }
    getCodeId() {
        return this.#id + "_code";
    }
    getX(padding) {
        return 20 + padding * (this.getW() + 20);
    }
    getY(depth) {
        return 20 + depth * this.#fontSize * 4;
    }
    getW() {
        return 190;
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
        d.innerHTML += "<div id='" + this.getCanvasAreaId() + "' style='position: relative;'></div>";
        d.innerHTML += "<canvas width=" + this.#width + " height=" + this.#height + " id='" + this.#cId + "'></canvas></div>";
        d.innerHTML += "<button onclick=\"execFunc('" + this.#id + "')\">一括実行</button>";
        d.innerHTML += "<button onclick=\"stepFunc('" + this.#id + "')\">１ステップ</button>";
        d.innerHTML += "<button onclick=\"autoFunc('" + this.#id + "')\">オートステップ</button>";
        d.innerHTML += "<button onclick=\"resetFunc('" + this.#id + "')\">リセット</button>";
        d.innerHTML += "<div id='" + this.#vId + "' class='out'></div>";
        d.innerHTML += "<hr/>";
        d.innerHTML += "<div id='" + this.#oId + "' class='out'></div>";
        document.getElementById(this.#vId).innerHTML = "<br/>".repeat(this.#vals.length);
        //document.getElementById(this.#oId).style.height = (this.#height - 30) + "px";
    }
    getFunc(str = "") {
        return Function("\"use strict\";" + this.getInitValsStr() + str + ";" + this.getUpdateValsStr());
    }
    getIfFunc(str) {
        let tmpName;
        while (true) {
            tmpName = "v" + Math.floor((Math.random() * 1000)) + "i";
            if (typeof this.#curVals[tmpName] == "undefined") {
                break;
            }
        }
        return Function("\"use strict\";" + this.getInitValsStr() + "let " + tmpName + "=(" + str + ");" + this.getUpdateValsStr() + "return " + tmpName + ";");
    }
    clearValsOut() {
        document.getElementById(this.#vId).innerHTML = "";
    }
    clearOut() {
        document.getElementById(this.getValsId()).innerHTML = "";
        document.getElementById(this.getOutId()).innerHTML = "";
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
                case "if-blank":
                    s += "if(" + this.getInput(pId) + "){";
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
                    s += "let " + this.#parts[pId].prop.valName + " = " + this.getInput(pId) + ";";
                    pId = this.#parts[pId].next;
                    break;
                case "process-any":
                    s += this.getInput(pId) + ";";
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
        this.clearOut();
        try {
            let s = this.getExecStr(this.#startId, this.#endId);
            console.log(s);
            let f = Function("\"use strict\";" + this.getExecStr(this.#startId, this.#endId));
            return f();
        } catch (e) {
            //window.alert(e);
            console.log(e);
            print(e);
        }
    }
    step() {
        let isCont = true;
        try {
            main.setCurId(this.#id);
            //console.log("step:" + this.#curpId);
            let data = this.#parts[this.#curpId];
            let f;
            let execStr;
            let letArr = [];
            for (let i in this.#objs) {
                this.#objs[i].alpha = (i == this.#curpId ? 1 : 0.5);
            }
            switch (data.type) {
                case "terminal-start":
                    this.clearOut();
                    f = this.getFunc();
                    f();
                    this.#curpId = data.next;
                    break;
                case "terminal-end":
                    isCont = false;
                    break;
                case "process":
                    if (data.name.indexOf("let ") > -1) {
                        letArr = data.name.replace(/let /, "").split("=");
                        f = this.getFunc("return " + letArr[1] + ";");
                        this.setVal(letArr[0].trim(), f());
                        f = this.getFunc();
                        console.log(this.#curVals);
                    }
                    else {
                        execStr = data.name + ";";
                        f = this.getFunc(execStr);
                    }
                    f();
                    this.#curpId = data.next;
                    break;
                case "process-let":
                    f = this.getFunc("return " + this.getInput(this.#curpId) + ";")
                    this.setVal(data.prop.valName, f());
                    f = this.getFunc();
                    f();
                    console.log(this.#curVals);
                    this.#curpId = data.next;
                    break;
                case "process-any":
                    if (this.getInput(this.#curpId).indexOf("let ") > -1) {
                        letArr = this.getInput(this.#curpId).replace(/let /, "").split("=");
                        f = this.getFunc("return " + letArr[1]);
                        this.setVal(letArr[0].trim(), f());
                        f = this.getFunc("");
                    }
                    else {
                        f = this.getFunc(this.getInput(this.#curpId));
                    }
                    f();
                    this.#curpId = data.next;
                    break;
                case "if-else":
                    f = this.getIfFunc(data.name);
                    if (f()) {
                        this.#curpId = data.next[0];
                    }
                    else {
                        this.#curpId = data.next[1];
                    }
                    break;
                case "if-blank":
                    f = this.getIfFunc(this.getInput(this.#curpId));
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
                    this.setVal(data.prop.valName, data.prop.remains.shift());
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
        } catch (e) {
            print(e);
            isCont = false;
        } finally {
            return isCont;
        }
    }
    setVal(name, value) {
        this.#curVals[name] = value;
    }
    updateVals(vals) {
        for (let i in vals) {
            this.#curVals[i] = vals[i];
        }
        this.clearValsOut();
        for (let i in this.#vals) {
            console.log("find " + this.#vals[i]);
            if (typeof this.#curVals[this.#vals[i]] != "undefined") {
                document.getElementById(this.#vId).innerHTML += this.#vals[i] + " = " + this.#curVals[this.#vals[i]] + "<br/>";
            }
            else {
                document.getElementById(this.#vId).innerHTML += "<br/>";
            }
        }
        console.log(this.#curVals);
    }
    getInitValsStr() {
        let arr = [];
        for (let i in this.#curVals) {
            arr.push(i + "=" + this.#curVals[i]);
        }
        if (arr.length) {
            return "let " + arr.join(",") + ";";
        }
        else {
            return "";
        }
    }
    getUpdateValsStr() {
        let arr = [];
        for (let i in this.#curVals) {
            arr.push("\"" + i + "\": " + i);
        }
        return "updateVals({" + arr.join(",") + "});";
    }
    resetStep() {
        this.#curpId = this.#startId;
        //this.#execStr = "\"use strict\";";
        this.clearOut();
        this.#isAuto = false;
        for (let i in this.#parts) {
            if (this.#parts[i].type == "for-range") {
                this.#parts[i].prop.isInited = false;
                this.#parts[i].prop.remains = [];
            }
        }
        for (let i in this.#objs) {
            this.#objs[i].alpha = 1;
        }
        this.#curVals = {};
        document.getElementById(this.#vId).innerHTML = "<br/>".repeat(this.#vals.length);
    }
    autoStep() {
        this.#isAuto = !this.#isAuto;
    }
    stopAutoStep() {
        this.#isAuto = false;
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