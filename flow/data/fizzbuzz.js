parts["fizzbuzz"] = {
    1: {
        type: "terminal-start",
        name: "start",
        next: 2
    },
    2: {
        type: "process",
        name: "let i = 1",
        next: 3
    },
    3: {
        type: "for-range",
        name: "i of range(1,31,1)",
        next: 4,
        end: 11
    },
    4: {
        type: "if-blank",
        prop: {
            initVal: "i % 15 == 0"
        },
        next: [5, 6],
        conv: 11
    },
    5: {
        type: "process-any",
        prop: {
            initVal: "print('FizzBuzz')"
        },
        next: 11
    },
    6: {
        type: "if-blank",
        name: "i % 3 == 0",
        next: [7, 8],
        conv: 11
    },
    7: {
        type: "process-any",
        name: "print('Fizz')",
        next: 11
    },
    8: {
        type: "if-blank",
        name: "i % 5 == 0",
        next: [9, 10],
        conv: 11
    },
    9: {
        type: "process-any",
        name: "print('Buzz')",
        next: 11
    },
    10: {
        type: "process-any",
        name: "print(i)",
        next: 11
    },
    11: {
        type: "for-end",
        next: 12
    },
    12: {
        type: "terminal-end",
        name: "end",
    }
};
options["fizzbuzz"] = {
    title: "サンプル4(FizzBuzz)",
    vals: ["i"]
};