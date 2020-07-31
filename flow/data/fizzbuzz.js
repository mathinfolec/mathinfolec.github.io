parts["fizzbuzz"] = {
    1: {
        type: "terminal-start",
        name: "start",
        x: 100,
        y: 20,
        next: "2"
    },
    2: {
        type: "process",
        name: "let i = 1",
        x: 100,
        y: 80,
        next: "3"
    },
    3: {
        type: "for-range",
        name: "i of range(1,31,1)",
        x: 100,
        y: 140,
        next: "4",
        end: "11"
    },
    4: {
        type: "if-else",
        name: "i % 15 == 0",
        x: 100,
        y: 200,
        next: ["5", "6"],
        conv: "11"
    },
    5: {
        type: "process",
        name: "print('FizzBuzz')",
        x: 20,
        y: 260,
        next: "11"
    },
    6: {
        type: "if-else",
        name: "i % 3 == 0",
        x: 180,
        y: 260,
        next: ["7", "8"],
        conv: "11"
    },
    7: {
        type: "process",
        name: "print('Fizz')",
        x: 100,
        y: 320,
        next: "11"
    },
    8: {
        type: "if-else",
        name: "i % 5 == 0",
        x: 260,
        y: 320,
        next: ["9", "10"],
        conv: "11"
    },
    9: {
        type: "process",
        name: "print('Buzz')",
        x: 180,
        y: 380,
        next: "11"
    },
    10: {
        type: "process",
        name: "print(i)",
        x: 340,
        y: 380,
        next: "11"
    },
    11: {
        type: "for-end",
        x: 100,
        y: 440,
        next: "12"
    },
    12: {
        type: "terminal-end",
        name: "end",
        x: 100,
        y: 500
    }
};
options["fizzbuzz"] = {
    title: "サンプル4(FizzBuzz)",
    width: 600,
    height: 550
};