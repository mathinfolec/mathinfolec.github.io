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
            input = document.createElement("input");
            tId = getInputId(id, pId);
            input.id = tId;
            input.setAttribute("type", "text");
            if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
                input.setAttribute("value", data.prop.initVal);
            }
            else {
                input.setAttribute("value", 0);
            }
            input.style.position = "absolute";
            document.getElementById(getCanvasAreaId(id)).appendChild(input);
            document.getElementById(tId).style.top = (data.y + (data.h - fontSize * wRate) / 2) + "px";
            document.getElementById(tId).style.left = (data.x + data.w / 2 + (t.text.length / 2 - 4) * fontSize / 2) + "px";
            document.getElementById(tId).style.width = (fontSize * 6 / 2) + "px";
            document.getElementById(tId).style.height = fontSize + "px";
            break;
        case "process-any":
            s.graphics.beginFill("yellow").drawRect(0, 0, data.w, data.h);
            t.text = "                  ";
            input = document.createElement("input");
            tId = getInputId(id, pId);
            input.id = tId;
            input.setAttribute("type", "text");
            if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
                input.setAttribute("value", data.prop.initVal);
            }
            else {
                input.setAttribute("value", "");
            }
            input.style.position = "absolute";
            document.getElementById(getCanvasAreaId(id)).appendChild(input);
            document.getElementById(tId).style.top = (data.y + (data.h - fontSize * wRate) / 2) + "px";
            document.getElementById(tId).style.left = (data.x + data.w / 2 - (t.text.length / 2) * fontSize / 2) + "px";
            document.getElementById(tId).style.width = (fontSize * t.text.length / 2) + "px";
            document.getElementById(tId).style.height = fontSize + "px";
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
            input = document.createElement("input");
            tId = getInputId(id, pId);
            input.id = tId;
            input.setAttribute("type", "text");
            if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
                input.setAttribute("value", data.prop.initVal);
            }
            else {
                input.setAttribute("value", "true");
            }
            input.style.position = "absolute";
            document.getElementById(getCanvasAreaId(id)).appendChild(input);
            document.getElementById(tId).style.top = (data.y + (data.h - fontSize * wRate) / 2) + "px";
            document.getElementById(tId).style.left = (data.x + data.w / 2 - 5 * fontSize / 2) + "px";
            document.getElementById(tId).style.width = (fontSize * 12 * 0.9 / 2) + "px";
            document.getElementById(tId).style.height = fontSize + "px";
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
            input = document.createElement("input");
            tId = getInputId(id, pId);
            input.id = tId;
            input.setAttribute("type", "text");
            if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
                input.setAttribute("value", data.prop.initVal);
            }
            else {
                input.setAttribute("value", "0,10,1");
            }
            input.style.position = "absolute";
            document.getElementById(getCanvasAreaId(id)).appendChild(input);
            document.getElementById(tId).style.top = (data.y + (data.h - fontSize * wRate) / 2) + "px";
            document.getElementById(tId).style.left = (data.x + data.w / 2 + (t.text.length / 2 - 8) * fontSize / 2) + "px";
            document.getElementById(tId).style.width = (fontSize * 6 * 0.9 / 2) + "px";
            document.getElementById(tId).style.height = fontSize + "px";
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
            t.text = "while(               )";
            input = document.createElement("input");
            tId = getInputId(id, pId);
            input.id = tId;
            input.setAttribute("type", "text");
            if (typeof data.prop != "undefined" && typeof data.prop.initVal != "undefined") {
                input.setAttribute("value", data.prop.initVal);
            }
            else {
                input.setAttribute("value", "true");
            }
            input.style.position = "absolute";
            document.getElementById(getCanvasAreaId(id)).appendChild(input);
            document.getElementById(tId).style.top = (data.y + (data.h - fontSize * wRate) / 2) + "px";
            document.getElementById(tId).style.left = (data.x + data.w / 2 - 5 * fontSize / 2) + "px";
            document.getElementById(tId).style.width = (fontSize * 15 * 0.9 / 2) + "px";
            document.getElementById(tId).style.height = fontSize + "px";
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