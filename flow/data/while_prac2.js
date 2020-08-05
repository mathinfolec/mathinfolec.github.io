parts["while_prac2"] = {
    0: {
        type: "terminal-start",
        name: "start",
        next: 1
    },
    1: {
        type: "process-let",
        prop: {
            valName: "i",
            initVal: 1
        },
        next: 2
    },
    2: {
        type: "process-let",
        prop: {
            valName: "sum",
            initVal: 0
        },
        next: 3
    },
    3: {
        type: "while-blank",
        prop: {
            initVal: "i <= 10"
        },
        next: 4,
        end: 6
    },
    4: {
        type: "process-any",
        prop: {
            initVal: "sum = sum + i",
        },
        next: 5
    },
    5: {
        type: "process-any",
        prop: {
            initVal: "i = i + 1"
        },
        next: 6
    },
    6: {
        type: "while-end",
        next: 7
    },
    7: {
        type: "process",
        name: "print(sum)",
        next: 8
    },
    8: {
        type: "terminal-end",
        name: "end"
    }
};
options["while_prac2"] = {
    title: "練習4(ループによる合計計算)",
    vals: ["i", "sum"],
    exp: "①このフローチャートでは1から10までの自然数の和を計算して出力していることを理解しましょう。<br/>"
        + "②1から20までの自然数の和を計算して出力しましょう。答えは210になります。<br/>"
        + "③1から20までの<b>偶数</b>の和を計算して出力しましょう。答えは110になります。<br/>"
        + "④(応用)ai=i^2+i+1としたとき、Σai(iは1から20までの自然数)を計算して出力しましょう。答えは3100になります。<br/>"
        + "⑤(応用)10!を計算して出力しましょう。答えは3628800になります。"
};