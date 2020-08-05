parts["process_test"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process-any",
        next: 3
    },
    3: {
        type: "process-any",
        next: 4
    },
    4: {
        type: "terminal-end",
        name: "end",
    }
};
options["process_test"] = {
    title: "練習1(変数と計算)",
    vals: ["a"],
    exp: "①変数aを好きな初期値で定義し、aの2乗を出力するフローチャートを書きましょう。<br/>"
        + "②変数aを好きな初期値(自然数)で定義し、1からaまでの自然数の和を出力するフローチャートを書きましょう。"
};
