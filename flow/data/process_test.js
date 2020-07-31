parts["process_test"] = {
    1: {
        type: "terminal-start",
        name: "start",
        x: 100,
        y: 20,
        next: "2"
    },
    2: {
        type: "process",
        name: "print(3**2)",
        x: 100,
        y: 100,
        next: "3"
    },
    3: {
        type: "terminal-end",
        name: "end",
        x: 100,
        y: 180
    }
};
options["process_test"] = {
    title: "サンプル1",
    width: 400,
    height: 250
};