qdata["if_sample"] = {
    title: "if文による分岐",
    section: 0,
    exp: "ifを使うことで、条件を満たしている時と満たしていないときで処理を場合分けすることが出来ます。\n\n"
        + "if(条件式){\n  条件式が成り立っているときの処理;\n}\nelse{\n  条件式が成り立っていないときの処理;\n}\n\n"
        + "このサンプルでは、入力aが奇数なら'Odd'と、偶数なら'Even'と出力しています。"
        + "if文の中身はa%2==0となっていますが、これはaを2で割った余りが0であるかを考えています。",
    defCode: "let a=read();\nif(a%2==0){\n  print('Even');\n}\nelse{\n  print('Odd');\n}",
    sample: [
        {
            in: "2",
            out: "Even"
        },
        {
            in: "15",
            out: "Odd"
        }
    ]
};