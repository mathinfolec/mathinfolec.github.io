qdata["input"] = {
    title: "変数の入力",
    section: "sample",
    exp: "let a=read();とすると、aという名前の変数を定義し、入力された1つ目の値をaに代入することが出来ます。"
        + "例えば入力に3と書かれていた場合、aという名前の変数に3という値が入ることになります。\n"
        + "また、この後にlet b=read();とすると、今度は入力のうち2つ目の値がbに代入されます。"
        + "入力を複数用意したい場合はそれぞれの入力を半角スペースで区切ります。",
    defCode: "let a=read();\nlet b=read();\nprint(a);\nprint(b);",
    sample: [
        {
            in: "3 7",
            out: "3\n7"
        },
        {
            in: "10 5",
            out: "10\n5"
        }
    ]
};