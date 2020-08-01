parts["hello"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process",
        name: "print('Hello')",
        next: 3
    },
    3: {
        type: "process-any",
        prop: {
            initVal: "print('World')"
        },
        next: 4
    },
    4: {
        type: "terminal-end",
        name: "end",
    }
};
options["hello"] = {
    title: "フローチャートの基本",
    exp: "フローチャートは「流れ図」という和訳の通り、処理の流れを図に表したものです。"
        + "startからendまで、上から下に流れていくように処理が行われます。<br/>"
        + "「実行」ボタンを押すと、流れに沿った処理をしてくれます。「ステップ」を押すと処理を1つずつ手動で進められます。"
        + "最初から処理をやり直したい場合は「リセット」ボタンを押します。<br/>"
        + "2つ目の処理は自分で決められますので、好きな文字をprintしてみましょう。"
        + "(文字はシングルクォート(')で囲む必要があります。数値は囲みません。)"
};