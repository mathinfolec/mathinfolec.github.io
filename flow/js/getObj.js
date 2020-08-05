setInput = function (id, pId) {
    let wRate = 1.3;
    let data = parts[id][pId];
    let input = document.createElement("input");
    let tId = getInputId(id, pId);
    input.id = tId;
    input.setAttribute("type", "text");
    if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
        input.setAttribute("value", data.prop.initVal);
    }
    else {
        let v = "";
        switch (v) {
            case "process-let":
                v = 0;
                break;
            case "process-any":
                v = "";
                break;
            case "if-blank":
            case "while-blank":
                v = "true";
                break;
        }
        input.setAttribute("value", v);
    }
    input.setAttribute("onchange", "addLog('change','" + id + "')");
    input.style.position = "absolute";
    document.getElementById(getCanvasAreaId(id)).appendChild(input);
    document.getElementById(tId).style.top = (data.y + (data.h - fontSize * wRate) / 2) + "px";
    document.getElementById(tId).style.height = fontSize + "px";
    let l = 0;
    let w = 0;
    switch (data.type) {
        case "process-let":
            l = data.x + data.w / 2 + (data.prop.valName.length / 2 + 2) * fontSize / 2;
            w = fontSize * 6 / 2;
            break;
        case "process-any":
            l = data.x + data.w / 2 - 9 * fontSize / 2;
            w = fontSize * 9;
            break;
        case "if-blank":
            l = data.x + data.w / 2 - 5 * fontSize / 2;
            w = fontSize * 12 * 0.9 / 2;
            break;
        case "while-blank":
            l = data.x + data.w / 2 - 4 * fontSize / 2;
            w = fontSize * 13 * 0.9 / 2;
            break;
        case "for-blank":
            l = data.x + data.w / 2 + (data.prop.valName.length / 2 + 3) * fontSize / 2;
            w = fontSize * 6 * 0.9 / 2;
            break;
    }
    document.getElementById(tId).style.left = l + "px";
    document.getElementById(tId).style.width = w + "px";
}
getObj = function (id, pId) {
    parts[id][pId].x = getX(parts[id][pId].padding);
    parts[id][pId].y = getY(parts[id][pId].depth);
    parts[id][pId].w = getW();
    parts[id][pId].h = getH();
    let data = parts[id][pId];
    let c = new createjs.Container();
    let s = new createjs.Shape();
    let t = new createjs.Text("", fontSize + "px monospace", "black");
    let input;
    let tId;
    let wRate = 1.3;
    switch (data.type) {
        case "terminal-start":
        case "terminal-end":
            s.graphics.beginFill("pink").drawRoundRect(0, 0, data.w, data.h, data.h / 2, data.h / 2);
            t.text = data.name;
            break;
        case "process":
            s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
            t.text = data.name;
            break;
        case "process-let":
            s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
            t.text = "let " + data.prop.valName + " =     ";
            setInput(id, pId);
            break;
        case "process-any":
            s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
            t.text = "                  ";
            setInput(id, pId);
            break;
        case "if-else":
            s.graphics.beginFill("lightgreen")
                .moveTo(-data.w / 6, data.h / 2)
                .lineTo(data.w / 2, -data.h / 6)
                .lineTo(data.w + data.w / 6, data.h / 2)
                .lineTo(data.w / 2, data.h + data.h / 6)
                .lineTo(-data.w / 6, data.h / 2);
            t.text = "if(" + data.name + ")";
            break;
        case "if-blank":
            s.graphics.beginFill("lightgreen")
                .moveTo(-data.w / 15, data.h / 2)
                .lineTo(data.w / 2, -data.h / 10)
                .lineTo(data.w + data.w / 15, data.h / 2)
                .lineTo(data.w / 2, data.h + data.h / 10)
                .lineTo(-data.w / 15, data.h / 2);
            t.text = "if(            )";
            setInput(id, pId);
            break;
        case "nothing":
            break;
        case "for-range":
            s.graphics.beginFill("lightblue")
                .moveTo(data.h / 3, 0)
                .lineTo(data.w - data.h / 3, 0)
                .lineTo(data.w, data.h / 3)
                .lineTo(data.w, data.h)
                .lineTo(0, data.h)
                .lineTo(0, data.h / 3)
                .lineTo(data.h / 3, 0);
            t.text = "for(" + data.name + ")";
            break;
        case "while":
            s.graphics.beginFill("lightblue")
                .moveTo(data.h / 3, 0)
                .lineTo(data.w - data.h / 3, 0)
                .lineTo(data.w, data.h / 3)
                .lineTo(data.w, data.h)
                .lineTo(0, data.h)
                .lineTo(0, data.h / 3)
                .lineTo(data.h / 3, 0);
            t.text = "while(" + data.name + ")";
            break;
        case "for-range-blank":
            s.graphics.beginFill("lightblue")
                .moveTo(data.h / 3, 0)
                .lineTo(data.w - data.h / 3, 0)
                .lineTo(data.w, data.h / 3)
                .lineTo(data.w, data.h)
                .lineTo(0, data.h)
                .lineTo(0, data.h / 3)
                .lineTo(data.h / 3, 0);
            t.text = "for(" + data.prop.valName + " of range(      ))";
            setInput(id, pId);
            break;
        case "while-blank":
            console.log("draw while-blank");
            s.graphics.beginFill("lightblue")
                .moveTo(data.h / 3, 0)
                .lineTo(data.w - data.h / 3, 0)
                .lineTo(data.w, data.h / 3)
                .lineTo(data.w, data.h)
                .lineTo(0, data.h)
                .lineTo(0, data.h / 3)
                .lineTo(data.h / 3, 0);
            t.text = "while(             )";
            setInput(id, pId);
            break;
        case "for-end":
            s.graphics.beginFill("lightblue")
                .moveTo(0, 0)
                .lineTo(data.w, 0)
                .lineTo(data.w, data.h - data.h / 3)
                .lineTo(data.w - data.h / 3, data.h)
                .lineTo(data.h / 3, data.h)
                .lineTo(0, data.h - data.h / 3)
                .lineTo(0, 0);
            t.text = "";
            break;
        case "while-end":
            s.graphics.beginFill("lightblue")
                .moveTo(0, 0)
                .lineTo(data.w, 0)
                .lineTo(data.w, data.h - data.h / 3)
                .lineTo(data.w - data.h / 3, data.h)
                .lineTo(data.h / 3, data.h)
                .lineTo(0, data.h - data.h / 3)
                .lineTo(0, 0);
            t.text = "";
            break;
        default:
            s.graphics.beginFill("white").drawRect(0, 0, data.w, data.h);
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