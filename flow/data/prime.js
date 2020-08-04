parts["prime"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process-let",
        prop: {
            valName: "a",
            initVal: 10
        },
        next: 3
    },
    3: {
        type: "process",
        name: "let flag = 1",
        next: 4
    },
    4: {
        type: "process",
        name: "let i = 2",
        next: 5
    },
    5: {
        type: "for-range",
        name: "i of range(2,a)",
        next: 6,
        end: 9
    },
    6: {
        type: "if-else",
        name: "a % i == 0",
        next: [7, 8],
        conv: 9
    },
    7: {
        type: "process",
        name: "flag = 0",
        next: 9
    },
    8: {
        type: "nothing",
        name: "",
        next: 9
    },
    9: {
        type: "for-end",
        next: 10
    },
    10: {
        type: "if-else",
        name: "flag == 1",
        next: [11, 12],
        conv: 13
    },
    11: {
        type: "process",
        name: "print('YES')",
        next: 13,
    },
    12: {
        type: "process",
        name: "print('No')",
        next: 13
    },
    13: {
        type: "terminal-end",
        name: "end",
    },
};
options["prime"] = {
    title: "？？？",
    vals: ["a", "flag", "i"],
    exp: "次のフローチャートは何をしているのか考えましょう。"
};