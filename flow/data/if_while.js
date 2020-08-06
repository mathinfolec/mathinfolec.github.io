parts["if_while"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process-let",
        prop: {
            valName: "a",
            initVal: 30
        },
        next: 3
    },
    3: {
        type: "process",
        name: "let i = 1",
        next: 4
    },
    4: {
        type: "while",
        name: "i <= a",
        next: 5,
        end: 8
    },
    5: {
        type: "if-else",
        name: "a % i == 0",
        next: [6, 7],
        conv: 7
    },
    6: {
        type: "process",
        name: "print(i)",
        next: 7
    },
    7: {
        type: "process",
        name: "i = i + 1",
        next: 8
    },
    8: {
        type: "while-end",
        next: 9
    },
    9: {
        type: "terminal-end",
        name: "end",
    },
};
options["if_while"] = {
    title: "条件文とループの組み合わせ",
    vals: ["a", "i"],
    exp: "ここまでのパーツを組み合わせることによって、やや複雑な処理も実現できるようになります。<br/>"
        + "例えばこのフローチャートでは、30の約数を順番に出力しています。なぜこのフローチャートでその処理が実現できるのか考えましょう。"
};