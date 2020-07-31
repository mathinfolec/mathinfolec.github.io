class Flow {
    #id;
    #title;
    #parts = {};
    #objs = {};
    #width;
    #height;
    #cId;
    #oId;
    #stage = null;
    #startId;
    #endId;
    #isDrawn = false;
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
            }
            else if (parts[id][i].type == "terminal-end") {
                this.#endId = i;
            }
        }
        this.#width = options[id].width;
        this.#height = options[id].height;
        this.#cId = this.getCanvasId(this.#id);
        this.#oId = this.getOutId(this.#id);
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
    getObj(pId) {
        let fontSize = 18;
        let data = this.#parts[pId];
        let c = new createjs.Container();
        let s = new createjs.Shape();
        let t = new createjs.Text("", fontSize + "px monospace", "black");
        data.w = 150;
        data.h = fontSize * 2;
        let input;
        let tId;
        let wRate = 1.3;
        switch (data.type) {
            case "terminal-start":
            case "terminal-end":
                s.graphics.beginFill("pink").drawRect(0, 0, data.w, data.h);
                s.x = data.x;
                s.y = data.y;
                t.text = data.name;
                break;
            case "process-let":
                s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
                s.x = data.x;
                s.y = data.y;
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
                document.getElementById(tId).style.top = (data.y + (data.h - fontSize * wRate) / 2) + "px";
                document.getElementById(tId).style.left = (data.x + data.w / 2 + (t.text.length / 2 - 4) * fontSize / 2) + "px";
                document.getElementById(tId).style.width = (fontSize * 3 / 2) + "px";
                document.getElementById(tId).style.height = fontSize + "px";
                break;
            case "process-any":
                s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
                s.x = data.x;
                s.y = data.y;
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
                document.getElementById(tId).style.top = (data.y + (data.h - fontSize * wRate) / 2) + "px";
                document.getElementById(tId).style.left = (data.x + data.w / 2 - (t.text.length / 2) * fontSize / 2) + "px";
                document.getElementById(tId).style.width = (fontSize * t.text.length / 2) + "px";
                document.getElementById(tId).style.height = fontSize + "px";
                break;
            case "if-else":
                s.graphics.beginFill("green").drawRect(0, 0, data.w, data.h);
                s.x = data.x;
                s.y = data.y;
                t.text = "if(" + data.name + ")";
                break;
            case "for-range":
                s.graphics.beginFill("lightblue").drawRect(0, 0, data.w, data.h);
                s.x = data.x;
                s.y = data.y;
                t.text = "for(" + data.name + ")";
                break;
            case "for-end":
                s.graphics.beginFill("lightblue").drawRect(0, 0, data.w, data.h);
                s.x = data.x;
                s.y = data.y;
                t.text = "";
                break;
            default:
                s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
                s.x = data.x;
                s.y = data.y;
                t.text = data.name;
                break;
        }
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.x = data.x + data.w / 2;
        t.y = data.y + data.h / 2;
        c.addChild(s);
        c.addChild(t);
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
    drawCanvas() {
        document.getElementById("main").innerHTML += "<div id='" + this.#id + "'></div><div class='clear'><hr/>";
        let d = document.getElementById(this.#id);
        d.innerHTML = "<h2>" + this.#title + "</h2>";
        d.innerHTML += "<div id='" + this.getCanvasAreaId(this.#id) + "' style='position: relative;'></div>";
        d.innerHTML += "<canvas width=" + this.#width + " height=" + this.#height + " id='" + this.#cId + "'></canvas></div>";
        d.innerHTML += "<button onclick=\"execFunc('" + this.#id + "')\">実行</button>";
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
        curId = this.#id;
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
    update() {
        this.#stage.update();
    }
    getId() {
        return this.#id;
    }
}