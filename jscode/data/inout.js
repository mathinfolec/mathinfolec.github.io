qdata["inout"] = {
    title: "入力と出力",
    section: 0,
    exp: "変数aが入力で与えられたとき、aの値と2a+1の値を改行区切りで出力する方法を考えます。\n"
        + "変数aを定義してそこに入力された値を代入するには、let a=read();とします。let a;とa=read();の2文に分けても同じ結果が得られます。\n"
        + "また、変数aの値を出力するには、print(a);とします。2a+1の値を出力する際にも同じようにprint(2*a+1);とできます。",
    defCode: "let a=read();\nprint(a);\nprint(2*a+1);",
    sample: [
        {
            in: "3",
            out: "3\n7"
        },
        {
            in: "10",
            out: "10\n21"
        }
    ]
};