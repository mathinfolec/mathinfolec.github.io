parts["flow_if"] = {
    1: {
        type: "terminal-start",
        name: "start",
        x: 100,
        y: 20,
        next: "0"
    },
    0: {
        type: "process-let",
        prop: {
            valName: "a",
            initVal: 5
        },
        x: 100,
        y: 100,
        next: "2"
    },
    2: {
        type: "if-else",
        name: "a < 5",
        x: 100,
        y: 180,
        next: ["3", "4"],
        conv: "5"
    },
    3: {
        type: "process",
        name: "print('YES')",
        x: 20,
        y: 260,
        next: "5"
    },
    4: {
        type: "process",
        name: "print('NO')",
        x: 180,
        y: 260,
        next: "5"
    },
    5: {
        type: "process",
        name: "print(a)",
        x: 100,
        y: 340,
        next: "6"
    },
    6: {
        type: "terminal-end",
        name: "end",
        x: 100,
        y: 400
    }
};
options["flow_if"] = {
    title: "サンプル2",
    width: 400,
    height: 500
};