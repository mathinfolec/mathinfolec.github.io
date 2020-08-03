parts["class_id"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process-let",
        prop: {
            valName: "a",
            initVal: 5123
        },
        next: 3
    },
    3: {
        type: "process",
        name: "print(a)",
        next: 4
    },
    4: {
        type: "if-blank",
        prop: {
            initVal: "a>=5101"
        },
        next: [5, 8],
        conv: 9
    },
    5: {
        type: "if-blank",
        prop: {
            initVal: "a<=5140"
        },
        next: [6, 7],
        conv: 9
    },
    6: {
        type: "process",
        name: "print('YES')",
        next: 9
    },
    7: {
        type: "process",
        name: "print('NO')",
        next: 10
    },
    10: {
        type: "process",
        name: "print('大きすぎ')",
        next: 9
    },
    8: {
        type: "process",
        name: "print('NO')",
        next: 11
    },
    11: {
        type: "process",
        name: "print('小さすぎ')",
        next: 9
    },
    9: {
        type: "terminal-end",
        name: "end"
    }
};
options["class_id"] = {
    title: "サンプル5",
    vals: ["a"],
    exp: "学年、組、出席番号によって構成される4桁の数字を考えます。この数字が自分のクラスに含まれているかどうかを判定しましょう。"
};