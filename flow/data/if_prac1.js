parts["if_prac1"] = {
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
        conv: 6
    },
    4: {
        type: "process-any",
        name: "print('YES')",
        next: 6
    },
    5: {
        type: "process-any",
        name: "print('NO')",
        next: 6
    },
    6: {
        type: "terminal-end",
        name: "end"
    }
};
options["if_prac1"] = {
    title: "練習:合格判定",
    vals: ["a"],
    exp: "合格点が80点のテストがあります。点数を変数aに代入し、この点数が合格ならYES、そうでないならNOを出力しましょう。"
};