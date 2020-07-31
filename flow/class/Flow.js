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
        this.#cId = Flow.getCanvasId(this.#id);
        this.#oId = Flow.getOutId(this.#id);
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
        let data = this.#parts[pId];
        let c = new createjs.Container();
        let s = new createjs.Shape();
        let t = new createjs.Text("", "20px sans-serif", "black");
        data.w = 150;
        data.h = 50;
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
                let input = document.createElement("input");
                let tId = Flow.getInputId(this.#id, pId);
                input.id = tId;
                input.setAttribute("type", "text");
                input.setAttribute("size", "20");
                if (data.prop.initVal != null) {
                    input.setAttribute("value", data.prop.initVal);
                }
                input.setAttribute("width", "20px");
                input.style.position = "absolute";
                document.getElementById(Flow.getCanvasAreaId(this.#id)).appendChild(input);
                document.getElementById(tId).style.top = (data.x + (data.h - 20) / 2) + "px";
                document.getElementById(tId).style.left = (data.y + data.w / 2 + 20) + "px";
                document.getElementById(tId).style.width = "40px";
                t.text = "let " + data.prop.valName + " =       ";
                break;
            case "if-else":
                s.graphics.beginFill("green").drawRect(0, 0, data.w, data.h);
                s.x = data.x;
                s.y = data.y;
                t.text = "if(" + data.name + ")";
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
    static getCanvasId(id) {
        return id + "_canvas";
    }
    static getOutId(id) {
        return id + "_out";
    }
    static getCanvasAreaId(id) {
        return id + "_canvasdiv";
    }
    static getInputId(id, pId) {
        return id + "_input_" + pId;
    }
    static getCodeId(id) {
        return id + "_code";
    }
    drawCanvas() {
        document.getElementById("main").innerHTML += "<div id=\"" + this.#id + "\"></div><div class=\"clear\"><hr/>";
        let d = document.getElementById(this.#id);
        d.innerHTML = "<h2>" + this.#title + "</h2>";
        d.innerHTML += "<div id=\"" + Flow.getCanvasAreaId(this.#id) + "\" style=\"position: relative;\"></div>";
        d.innerHTML += "<canvas width=" + this.#width + " height=" + this.#height + " id=\"" + this.#cId + "\"></canvas></div>";
        d.innerHTML += "<button onclick=\"execFunc(\'" + this.#id + "\')\" >実行</button>";
        d.innerHTML += "<div id=\"" + this.#oId + "\">Output</div>";
        document.getElementById(this.#oId).style.height = this.#height + "px";
    }
    static getFunc(str = "") {
        return Function("\"use strict\";" + str + ";");
    }
    static clearOut(id) {
        document.getElementById(Flow.getOutId(id)).innerHTML = "";
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
                    s += "let " + this.#parts[pId].prop.valName + " = " + document.getElementById(Flow.getInputId(this.#id, pId)).value + ";";
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
        Flow.clearOut(this.#id);
        try {
            let s = this.getExecStr(this.#startId, this.#endId);
            console.log(s);
            let f = Flow.getFunc(this.getExecStr(this.#startId, this.#endId));
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