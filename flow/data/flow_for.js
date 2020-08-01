parts["flow_for"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 0
    },
    0: {
        type: "process",
        name: "let i = 0",
        next: 2
    },
    2: {
        type: "for-range-blank",
        prop: {
            valName: "i",
            initVal: "0,10"
        },
        name: "i of range(0,10)",
        next: 3,
        end: 4
    },
    3: {
        type: "process-any",
        prop: {
            initVal: "print(i)",
        },
        next: 4
    },
    4: {
        type: "for-end",
        next: 5
    },
    5: {
        type: "terminal-end",
        name: "end",
    }
};
options["flow_for"] = {
    title: "ループ(for-range)",
    vals: ["i"],
    exp: "for(i of range(a,b))は「iをa以上b未満までループする」という意味になります。<br/>"
        + "今回はfor(i of range(0,10))とありますので、「iを0以上10未満までループする」、つまりiは0から9までの整数10個を取ります。"
};