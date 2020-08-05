parts["if_prac3"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process-let",
        prop: {
            valName: "a",
            initVal: 85
        },
        next: 3
    },
    3: {
        type: "if-blank",
        next: [4, 5],
        conv: 10
    },
    4: {
        type: "process-any",
        next: 10
    },
    5: {
        type: "if-blank",
        next: [6, 7],
        conv: 10
    },
    6: {
        type: "process-any",
        next: 10
    },
    7: {
        type: "if-blank",
        next: [8, 9],
        conv: 10
    },
    8: {
        type: "process-any",
        next: 10
    },
    9: {
        type: "process-any",
        next: 10
    },
    10: {
        type: "terminal-end",
        name: "end"
    }
};
options["if_prac3"] = {
    title: "練習:合格判定その2",
    vals: ["a"],
    exp: "合格点が80点のテストがあります。点数を変数aに代入し、この点数が合格なら'合格'、そうでないなら'不合格'を出力しましょう。<br/>"
        + "ただし、このテストは0点～100点までしかあり得ません。この範囲に収まっていない点数なら'不正'を出力しましょう。"
};