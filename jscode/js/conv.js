let flow = [];
let valNum = 0;
let conv = function () {
    flow = [];
    valNum = 0;
    let stack = [];
    //let dArr = document.getElementById("code_textarea").value.split("\n");
    let dArr = document.getElementById("code_textarea").value.replace(/\n/g, "").replace(/(;|\{|\})/g, "$1\n").split("\n");
    let curIndent = 0;
    try {
        flow[0] = {
            type: "terminal-start",
            name: "[START]",
            original: "[START]",
            indent: curIndent++,
            next: 1
        }
        for (let i = 1; i <= dArr.length; ++i) {
            let d = dArr[i - 1].replace(/;$/, "").trim();
            console.log(d);
            if (d.match(/^let /)) {
                let props = d.replace(/^let /, "").split("=");
                props[0] = props[0].trim();
                if (props.length == 1) {
                    props[1] = undefined;
                }
                else {
                    props[1] = props[1].trim();
                }
                flow[i] = {
                    type: "let",
                    original: d + ";",
                    valName: props[0],
                    initVal: props[1],
                    indent: curIndent,
                    next: i + 1
                };
                valNum += 1;
            }
            else if (d.match(/^while/)) {
                flow[i] = {
                    type: "while-start",
                    original: d,
                    name: d.replace(/^while *\((.+)\) *\{$/, "$1"),
                    indent: curIndent++,
                    next: i + 1
                };
                stack.push({
                    type: "while",
                    id: i
                });
            }
            else if (d.match(/^if/)) {
                flow[i] = {
                    type: "if-start",
                    original: d,
                    name: d.replace(/^if *\((.+)\) *\{$/, "$1"),
                    indent: curIndent++,
                    next: [i + 1]
                };
                stack.push({
                    type: "if",
                    id: i
                });
            }
            else if (d.match(/}/)) {
                let ps = stack.pop();
                if (ps.type == "while") {
                    flow[ps.id].end = i;
                    flow[i] = {
                        type: "while-end",
                        original: d,
                        start: ps.id,
                        indent: --curIndent,
                        next: i + 1
                    };
                }
                else if (ps.type == "if") {
                    flow[ps.id].next[1] = i + 1;
                    flow[i] = {
                        type: "if-end",
                        original: d,
                        indent: --curIndent,
                        next: i + 1
                    };
                }
                else if (ps.type == "else") {
                    flow[i] = {
                        type: "else-end",
                        original: d,
                        indent: --curIndent,
                        next: i + 1
                    };
                    flow[ps.pre].next = i + 1;
                }
            }
            else if (d.match(/^else/)) {
                flow[i] = {
                    type: "else",
                    original: d,
                    indent: curIndent++,
                    next: i + 1
                };
                stack.push({
                    type: "else",
                    id: i,
                    pre: i - 1
                });
            }
            else {
                flow[i] = {
                    type: "process",
                    name: d,
                    original: d + ";",
                    indent: curIndent,
                    next: i + 1
                };
            }
        }
        flow[dArr.length] = {
            type: "terminal-end",
            name: "[END]",
            original: "[END]",
            indent: --curIndent
        };
        if (curIndent != 0 && stack.length != 0) {
            throw new SyntaxError("コードの整形に失敗しました。カッコの位置や個数などを再確認してください。");
        }
        let cd = document.getElementById("code");
        cd.innerHTML = "";
        for (let i = 0; i < flow.length; ++i) {
            let dd = document.createElement("div");
            dd.id = getDivId(i);
            dd.className = "code-line";
            dd.innerHTML = "&ensp;&ensp;".repeat(flow[i].indent) + flow[i].original;
            cd.appendChild(dd);
        }
        resetStep();
        hideTextArea();
    } catch (e) {
        window.alert(e);
    }
}
let getDivId = function (id) {
    return "code" + id;
}
let reqConv = function () {
    document.getElementById("button_auto").disabled = true;
    document.getElementById("button_step").disabled = true;
    document.getElementById("button_reset").disabled = true;
}