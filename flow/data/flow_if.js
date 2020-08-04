parts["flow_if"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "if-blank",
        prop: {
            initVal: "3 < 4"
        },
        next: [3, 4],
        conv: 5
    },
    3: {
        type: "process",
        name: "print('true')",
        next: 5
    },
    4: {
        type: "process",
        name: "print('false')",
        next: 5
    },
    5: {
        type: "process",
        name: "print('both')",
        next: 6
    },
    6: {
        type: "terminal-end",
        name: "end"
    }
};
options["flow_if"] = {
    title: "条件文",
    exp: "フローチャートでは条件文を使い、「その条件を満たしているかいないか」で次の処理を変えることが出来ます。"
        + "条件を満たしている場合はtrueの方へ、満たしていない場合はfalseの方へ進みます。<br/>"
        + "色々な条件式を書いて処理を確認してみましょう。<br/>"
        + "(例)5の7乗は9の5乗よりも小さいか？"
};