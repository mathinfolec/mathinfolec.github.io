parts["flow_if"] = {
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
        type: "process",
        name: "print(a*b)",
        next: "8"
    },
    8: {
        type: "terminal-end",
        name: "end"
    }
};
options["flow_if"] = {
    title: "サンプル2",
    vals: ["a", "b"],
};