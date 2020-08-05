parts["while_prac1"] = {
    0: {
        type: "terminal-start",
        name: "start",
        next: 1
    },
    1: {
        type: "process-let",
        prop: {
            valName: "i",
            initVal: 0
        },
        next: 2
    },
    2: {
        type: "while-blank",
        prop: {
            initVal: "i < 10"
        },
        next: 3,
        end: 5
    },
    3: {
        type: "process-any",
        prop: {
            initVal: "print(i)",
        },
        next: 4
    },
    4: {
        type: "process-any",
        prop: {
            initVal: "i = i + 1"
        },
        next: 5
    },
    5: {
        type: "while-end",
        next: 6
    },
    6: {
        type: "terminal-end",
        name: "end",
    }
};
options["while_prac1"] = {
    title: "練習:ループによる出力",
    vals: ["i"],
    exp: "①このフローチャートでは0から9までの整数を小さい順に出力していることを理解しましょう。<br/>"
        + "②0から10までの整数を小さい順に出力しましょう。<br/>"
        + "③1から10までの整数を小さい順に出力しましょう。<br/>"
        + "④1から20までの<b>偶数</b>を小さい順に出力しましょう。<br/>"
        + "⑤1から20までの<b>奇数</b>を小さい順に出力しましょう。<br/>"
        + "⑥(応用)1から20までの<b>奇数</b>を<b>大きい順</b>に出力しましょう。"
};