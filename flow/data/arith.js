parts["arith"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process-any",
        prop: {
            initVal: "print(1+3)"
        },
        next: 3
    },
    3: {
        type: "process-any",
        prop: {
            initVal: "print(3+4*2)"
        },
        next: 4
    },
    4: {
        type: "process-any",
        prop: {
            initVal: "print((3+4)*2)"
        },
        next: 5
    },
    5: {
        type: "terminal-end",
        name: "end",
    }
};
options["arith"] = {
    title: "計算",
    exp: "プログラムでは四則演算をはじめとした計算をし、その結果を表示することが出来ます。<br/>"
        + "例えばprint(1+3)とすると、1+3の計算結果である4が出力されます。"
        + "資料を参考に、色々な計算を試してみてください。"
};