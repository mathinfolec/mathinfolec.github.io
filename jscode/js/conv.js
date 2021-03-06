const conv = function () {
    flow = [];
    valNum = 0;
    let stack = [];
    let loopStack = [];
    //let dArr = document.getElementById("code_textarea").value.split("\n");
    let dTmpArr = getCode().replace(/\n/g, "").replace(/(;|\{|\})/g, "$1\n").split("\n");
    let dArr = [];
    for (let i = 0; i < dTmpArr.length; ++i) {
        if (dTmpArr[i].trim().match(/^for\(/)) {
            dArr.push(dTmpArr[i] + dTmpArr[i + 1] + dTmpArr[i + 2]);
            i += 2;
        }
        else {
            dArr.push(dTmpArr[i]);
        }
    }
    console.log(dArr);
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
            //console.log(d);
            if (d.match(/^let /)) {
                let vals = d.replace(/^let /, "").split(",");
                let sets = [];
                for (let j = 0; j < vals.length; ++j) {
                    let props = vals[j].split("=");
                    props[0] = props[0].trim();
                    if (props.length == 1) {
                        props[1] = undefined;
                    }
                    else {
                        props[1] = props[1].trim();
                    }
                    sets[j] = { valName: props[0], initVal: props[1] };
                }
                flow[i] = {
                    type: "let",
                    original: d + ";",
                    sets: sets,
                    indent: curIndent,
                    next: i + 1
                };
                valNum += sets.length;
            }
            else if (d.match(/^while/)) {
                if (!(d.match(/^while *\(.+\) *\{$/))) {
                    throw SyntaxError("while文のカッコ{が抜けているか、記法が間違っている可能性があります。");
                }
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
                loopStack.push(i);
            }
            else if (d.match(/^for/)) {
                if (!(d.match(/^for *\(.+\) *\{$/))) {
                    throw SyntaxError("for文のカッコ{が抜けているか、記法が間違っている可能性があります。");
                }
                flow[i] = {
                    type: "for-start",
                    original: d,
                    isFirst: true,
                    name: d.replace(/^for *\((.+)\) *\{$/, "$1").split(";"),
                    indent: curIndent++,
                    next: i + 1
                };
                stack.push({
                    type: "for",
                    id: i
                });
                loopStack.push(i);
            }
            else if (d.match(/^if/)) {
                if (!(d.match(/^if *\(.+\) *\{$/))) {
                    throw SyntaxError("if文のカッコ{が抜けているか、記法が間違っている可能性があります。");
                }
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
            else if (d.match(/^}$/)) {
                if (stack.length == 0) {
                    throw SyntaxError("カッコの対応付けが取れていません。\"{\"と\"}\"が同じ数あることを確認してください。");
                }
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
                    loopStack.pop();
                }
                else if (ps.type == "for") {
                    flow[ps.id].end = i;
                    flow[i] = {
                        type: "for-end",
                        original: d,
                        start: ps.id,
                        indent: --curIndent,
                        next: i + 1
                    };
                    loopStack.pop();
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
                else if (ps.type == "nothing") {
                    flow[i] = {
                        type: "process",
                        original: d,
                        name: "",
                        indent: --curIndent,
                        next: i + 1
                    };
                }
            }
            else if (d.match(/^else *{/)) {
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
            else if (d.match(/^break$/)) {
                if (loopStack.length) {
                    let lId = loopStack.pop();
                    flow[i] = {
                        type: "break",
                        original: d + ";",
                        indent: curIndent,
                        loopId: lId
                    };
                    loopStack.push(lId);
                }
                else {
                    throw SyntaxError("ループ以外のところでbreakしています");
                }
            }
            else if (d.match(/^{$/)) {
                flow[i] = {
                    type: "process",
                    original: d,
                    name: "",
                    indent: curIndent++,
                    next: i + 1
                };
                stack.push({
                    type: "nothing",
                    id: i
                })
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
            dd.id = getCodeLineDivId(i);
            dd.className = "code-line";
            dd.innerHTML = ("&ensp;&ensp;".repeat(flow[i].indent) + flow[i].original).replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
            cd.appendChild(dd);
        }
        resetStep();
        hideTextArea();
    } catch (e) {
        window.alert(e);
    }
}