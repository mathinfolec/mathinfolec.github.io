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
    exp: "変数を使うことで色々な処理をすることができます。ここでは処理の先頭にletと書き、変数の名前と初期値を書くことで変数を定義します。<br/>"
        + "printを使えば変数の値を出力することもできます。計算した結果を色々出力してみましょう。"
        + "(変数や計算式の結果は数値として扱うため、シングルクォート(')で囲みません。)"
};