parts["flow_while"] = {
    0: {
        type: "terminal-start",
        name: "start",
        next: 1
    },
    1: {
        type: "process",
        name: "let i = 0",
        next: 2
    },
    2: {
        type: "while-blank",
        prop: {
            initVal: "i < 10"
        },
        next: 3,
        end: 5
    },
    3: {
        type: "process-any",
        prop: {
            initVal: "print(i)",
        },
        next: 4
    },
    4: {
        type: "process-any",
        prop: {
            initVal: "i = i + 1"
        },
        next: 5
    },
    5: {
        type: "while-end",
        next: 6
    },
    6: {
        type: "terminal-end",
        name: "end",
    }
};
options["flow_while"] = {
    title: "ループ(while)",
    vals: ["i"],
    exp: "whileループでは、条件が成り立っている間で処理を繰り返します。条件の確認はループ内の一連の処理が一通り終わってから行います。<br/>"
        + "条件が成り立たない場合、ループ終了のブロックの1つ次まで移動します。"
};