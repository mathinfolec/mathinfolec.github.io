qdata["linear"] = {
    title: "1次方程式の解",
    section: "if",
    exp: "a,b,c,dが入力として与えられます。xについての1次方程式ax+b=cの解を求めてください。\n"
        + "ただし、解が存在しない場合は「解不能」と、どのようなxでも方程式が成り立つ場合は「解不定」と出力してください。",
    defCode: "let a=read(), b=read(), c=read();",
    sample: [
        {
            in: "3 5 8",
            out: "1"
        },
        {
            in: "2 7 10",
            out: "1.5"
        },
        {
            in: "0 3 8",
            out: "解不能"
        },
        {
            in: "0 5 5",
            out: "解不定"
        }
    ]
};