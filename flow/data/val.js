parts["val"] = {
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
        type: "process",
        name: "print(a)",
        next: 4
    },
    4: {
        type: "process-any",
        prop: {
            initVal: "print(a+4)"
        },
        next: 5
    },
    5: {
        type: "terminal-end",
        name: "end",
    }
};
options["val"] = {
    title: "変数",
    vals: ["a"],
    exp: "変数を使うことで色々な処理をすることができます。ここでは変数を定義する際にletを使います。let a = 3とすると、aという名前の変数を初期値3で定義することが出来ます。<br/>"
        + "printを使えば変数の値や、変数を使った計算の結果を出力することもできます。計算した結果を色々出力してみましょう。"
        + "(変数やそれを使った計算の結果は数として扱うため、シングルクォート(')で囲みません。)"
};