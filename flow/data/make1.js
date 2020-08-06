parts["make1"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process-let",
        prop: {
            valName: "a",
            initVal: 5
        },
        next: 3
    },
    3: {
        type: "process",
        name: "print(a)",
        next: 4
    },
    4: {
        type: "while-blank",
        next: 5,
        end: 9
    },
    5: {
        type: "if-blank",
        next: [6, 7],
        conv: 8
    },
    6: {
        type: "process-any",
        next: 8
    },
    7: {
        type: "process-any",
        next: 8
    },
    8: {
        type: "process",
        name: "print(a)",
        next: 9
    },
    9: {
        type: "while-end",
        next: 10
    },
    10: {
        type: "terminal-end",
        name: "end"
    }
};
options["make1"] = {
    title: "練習:すべて1になる",
    vals: ["a"],
    exp: "すべての自然数に対して、次のことが言われています。<br/>"
        + "「『その数が偶数なら2で割り、奇数なら3倍して1を足す』という処理を繰り返すと、すべての自然数は最終的に1になる。」<br/>"
        + "この処理をフローチャートで表現し、本当に1になるのか確認しましょう。"
};