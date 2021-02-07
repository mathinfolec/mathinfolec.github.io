const setShapes = function (n, v, r) {
    if (n < 0) {
        n = 0;
    }
    if (shapes.length > n) {
        while (shapes.length > n) {
            shapes.pop();
        }
    }
    else if (shapes.length < n) {
        while (shapes.length < n) {
            shapes.push(getNewShape(v, r));
        }
    }
    for (let s of shapes) {
        s.v = v;
        s.r = r;
    }
}
const getNewShape = function (v, r) {
    return {
        x: r + Math.random() * (width - 2 * r),
        y: r + Math.random() * (height - 2 * r),
        r: r,
        v: v,
        angle: Math.random() * Math.PI * 2
    };
}
