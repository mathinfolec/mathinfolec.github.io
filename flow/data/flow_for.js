parts["flow_for"] = {
    1: {
        type: "terminal-start",
        name: "start",
        x: 100,
        y: 20,
        next: "0"
    },
    0: {
        type: "process",
        name: "let i = 0",
        x: 100,
        y: 100,
        next: "2"
    },
    2: {
        type: "for-start",
        name: "i in range(0,10,1)",
        x: 100,
        y: 180,
        next: "3",
        end: "4"
    },
    3: {
        type: "process-any",
        prop: {
            defValue: "print(i)",
        },
        x: 100,
        y: 260,
        next: "4"
    },
    4: {
        type: "for-end",
        x: 100,
        y: 340,
        next: "5"
    },
    5: {
        type: "terminal-end",
        name: "end",
        x: 100,
        y: 420
    }
};
options["flow_for"] = {
    title: "サンプル3",
    width: 400,
    height: 500
};