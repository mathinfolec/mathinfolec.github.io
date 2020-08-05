parts["while"] = {
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
options["while"] = {
    title: "whileループ",
    vals: ["i"],
    exp: "whileループでは、条件が成り立っている間ずっと処理を繰り返します。条件の確認はループ内の一連の処理が一通り終わってから行います。(条件の確認→ループ内の処理→条件の確認→…)"
        + "また、条件が成り立たない場合はループ終了のブロックの1つ次まで移動します。<br/>"
        + "例えば、while(i<10)ではiが10未満の間ループします。逆にiが10以上になった場合はループ内の処理に移らず、ループ終了ブロックの次(今回はend)に移ります。"
        + "iは初期値が0でループするたびに1増えていき、iが10未満の間これが続きます。つまりここでは0から9までの整数が順番に出力されることになります。<br/>"
        + "iの値は最終的には10になること、しかしこれはi<10の条件を満たしていないためprintされないことに注意してください。"
};