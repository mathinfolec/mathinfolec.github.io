parts["while_caution"] = {
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
        end: 4
    },
    3: {
        type: "process-any",
        prop: {
            initVal: "print(i)",
        },
        next: 4
    },
    4: {
        type: "while-end",
        next: 5
    },
    5: {
        type: "terminal-end",
        name: "end",
    }
};
options["while_caution"] = {
    title: "whileループの注意点",
    vals: ["i"],
    exp: "whileループの条件文やループ内の処理を誤ると、ループを抜け出せないことがあります。"
        + "このフローチャートではiの値がいつまでも変わらないため、常にi<10となってループから抜け出せません。<br/>"
        + "こういった無限ループになると、「リセット」ボタンを押すなどして強制的にプログラムを終了させなければいけません。ループの扱いには注意しましょう。"
};