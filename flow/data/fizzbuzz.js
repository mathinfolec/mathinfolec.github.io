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
        type: "while",
        name: "i <= 30",
        next: 4,
        end: 12
    },
    4: {
        type: "if-blank",
        next: [5, 6],
        conv: 11
    },
    5: {
        type: "process-any",
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
        type: "process",
        name: "i = i + 1",
        next: 12
    },
    12: {
        type: "while-end",
        next: 13
    },
    13: {
        type: "terminal-end",
        name: "end",
    }
};
options["fizzbuzz"] = {
    title: "FizzBuzz問題",
    vals: ["i"],
    exp: "FizzBuzz問題はプログラミングの世界で非常に有名な問題です。これが解けるかどうかで「プログラムを書ける人か」判断されることもあります。<br/>"
        + "次の条件を満たすフローチャートを書いてみましょう。(少し表現を簡単にしています。)"
        + "<ul><li>1以上30以下の自然数iに対してループ処理を行う。</li>"
        + "<li>iが3の倍数かつ5の倍数なら'FizzBuzz'と出力する。</li>"
        + "<li>iが3の倍数だが5の倍数ではないなら'Fizz'と出力する。</li>"
        + "<li>iが5の倍数だが3の倍数ではないなら'Buzz'と出力する。</li>"
        + "<li>また、iが3の倍数でも5の倍数でもないならiの値を出力する。</li></ul>"
        + "(ヒント)"
        + "<ul><li>iが3の倍数⇔iを3で割った余りが0</li></ul>"
};