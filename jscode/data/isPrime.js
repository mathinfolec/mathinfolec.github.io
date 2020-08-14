qdata["isPrime"] = {
    title: "素数判定",
    section: 0,
    exp: "自然数xが与えられます。その自然数が素数なら1、素数でないなら0を出力してください。\n"
        + "自然数xが素数ということは、xは2からx-1までで割り切れないことを意味します。",
    defCode: "let x=read();",
    sample: [
        {
            in: "7",
            out: "1"
        },
        {
            in: "12",
            out: "0"
        },
        {
            in: "1",
            out: "0"
        }
    ],
    test: [
        {
            in: "7",
            out: "1"
        },
        {
            in: "12",
            out: "0"
        },
        {
            in: "1",
            out: "0"
        }
    ]
};