parts["assign"] = {
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
            initVal: "a = a + 1"
        },
        next: 5
    },
    5: {
        type: "process",
        name: "print(a)",
        next: 6
    },
    6: {
        type: "terminal-end",
        name: "end",
    }
};
options["assign"] = {
    title: "変数定義後の代入",
    vals: ["a"],
    exp: "変数を定義した後に代入することもできます。"
        + "例えばa = 3とするとaに3を代入し、a = a + 1とするとaにa+1の値を代入します(もともとのaの値が3であれば、a+1の値は4になるのでaには4が代入されます)。"
};
