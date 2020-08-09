parts["swap"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process-let",
        prop: {
            valName: "a",
            initVal: 3
        },
        next: 3
    },
    3: {
        type: "process-let",
        prop: {
            valName: "b",
            initVal: 5
        },
        name: "print(a)",
        next: 4
    },
    4: {
        type: "process-let",
        prop: {
            valName: "c",
        },
        next: 5
    },
    5: {
        type: "process-any",
        next: 6
    },
    6: {
        type: "process-any",
        next: 7
    },
    7: {
        type: "process",
        name: "print(a)",
        next: 8
    },
    8: {
        type: "process",
        name: "print(b)",
        next: 9
    },
    9: {
        type: "terminal-end",
        name: "end",
    }
};
options["swap"] = {
    title: "練習:変数の入れ替え",
    vals: ["a", "b", "c"],
    exp: "変数aとbの中身を入れ替えて出力するプログラムを書きましょう。<br/>"
        + "ヒント:変数cを上手く使う必要があります。"
};
