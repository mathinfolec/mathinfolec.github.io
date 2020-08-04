parts["flow_if_val"] = {
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
        type: "process-let",
        prop: {
            valName: "b",
            initVal: 10
        },
        next: 4
    },
    4: {
        type: "if-blank",
        prop: {
            initVal: "a < b"
        },
        next: [5, 6],
        conv: 7
    },
    5: {
        type: "process",
        name: "print('YES')",
        next: 7
    },
    6: {
        type: "process",
        name: "print('NO')",
        next: 7
    },
    7: {
        type: "terminal-end",
        name: "end"
    }
};
options["flow_if_val"] = {
    title: "条件文と変数の組み合わせ",
    vals: ["a", "b"],
    exp: "条件文と変数を組み合わせることによって、より複雑な処理ができるようになります。"
};