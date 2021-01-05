const setMainColor = function (a, b) {
    options.mainColor[0] = a;
    options.mainColor[1] = b;
}
const setSubColor = function (a, b) {
    options.subColor[0] = a;
    options.subColor[1] = b;
}
let savedOptions = {};
const saveOptions = function () {
    for (let x in options) {
        if (Array.isArray(options[x])) {
            savedOptions[x] = options[x].concat();
        }
        else {
            savedOptions[x] = options[x];
        }
    }
}
const loadOptions = function () {
    for (let x in savedOptions) {
        if (Array.isArray(savedOptions[x])) {
            options[x] = savedOptions[x].concat();
        }
        else {
            options[x] = savedOptions[x];
        }
    }
}
const drawIllusionA = function (w, h, r, span, diff) {
    saveOptions();
    try {
        const cArr = options.mainColor.concat();
        const firstDig = options.rotation;
        for (let i = 0; i < span; ++i) {
            ctx.fillStyle = cArr[i % cArr.length];
            const deg1 = 2 * i / span * 180 + firstDig;
            const deg0 = 2 * (i - diff) / span * 180 + firstDig;
            const x = 250 + r * Math.sin(deg1 / 180 * Math.PI);
            const y = 250 - r * Math.cos(deg1 / 180 * Math.PI);
            setFillColor(cArr[mod(i, cArr.length)]);
            setRotation(deg0);
            drawRect(x, y, w, h, deg0);
        }
    } catch (e) {
        throw (e);
    } finally {
        loadOptions();
    }
}
const drawIllusionB = function (w, h, rx, ry, fx = 0, fy = 0) {
    saveOptions();
    try {
        if (w == 0 || h == 0) {
            throw SyntaxError("0 divisor");
        }
        const cArr = options.mainColor.concat();
        const cArr2 = options.subColor.concat();
        const cl = cArr.length;
        const row = Math.floor(c_height / h) + 1;
        const col = Math.floor(c_width / w) + 1;
        const rot = options.rotation;
        fx = mod(fx, w * cArr.length);
        fy = mod(fy, h * cArr.length);
        setLineWidth(0);
        for (let i = -2 * row; i < 2 * row + 1; ++i) {
            for (let j = -2 * row; j < 2 * col + 1; ++j) {
                setFillColor(cArr2[mod(i + j, cArr2.length)]);
                const ax = w * j + fx;
                const ay = h * i + fy;
                drawRect(rotX(ax, ay, rot), rotY(ax, ay, rot), w, h);
            }
        }
        for (let i = -2 * row; i < 2 * row; ++i) {
            for (let j = -2 * row; j < 2 * col; ++j) {
                setFillColor(cArr[mod(i + j, cl)]);
                const bx = w * j + fx + w / 2;
                const by = h * i + fy + h / 2
                drawRoundRect(rotX(bx, by, rot), rotY(bx, by, rot), w, h, rx, ry);
            }
        }
    } catch (e) {
        throw (e);
    } finally {
        loadOptions();
    }
}
const rotX = function (x, y, r, bx = c_width / 2, by = c_height / 2) {
    r = r / 180 * Math.PI;
    return (x - bx) * Math.cos(r) - (y - by) * Math.sin(r) + bx;
}
const rotY = function (x, y, r, bx = c_width / 2, by = c_height / 2) {
    r = r / 180 * Math.PI;
    return (x - bx) * Math.sin(r) + (y - by) * Math.cos(r) + by;
}
const drawIllusionC = function (w, h, c, fx = 0, fy = 0) {
    saveOptions();
    try {
        const cArr = options.mainColor.concat();
        const cArr2 = options.subColor.concat();
        const cl = cArr.length;
        const cl2 = cArr2.length;
        const lefte = cl * cl2;
        const row = Math.floor(c_height / (h + w)) + 1;
        const col = Math.floor(c_width / w) + 1;
        fx = mod(fx, w * lefte);
        fy = mod(fy, (w + h) * lefte);
        setLineWidth(0);
        const rot = options.rotation;
        for (let j = -2 * col; j < 2 * col + 1; ++j) {
            setFillColor(cArr2[mod(j, cl2)]);
            const ax = w * j + fx + w / 2;
            const ay = 250;
            drawRect(rotX(ax, ay, rot), rotY(ax, ay, rot), w, c_height * 2);
        }
        for (let i = -2 * row; i < 2 * row; ++i) {
            for (let j = -2 * col; j < 2 * col; ++j) {
                setFillColor(cArr[mod(i + j, cl)]);
                const bx = w * j + fx;
                const by = h + (w + h) * i + w / 2 + fy;
                drawRect(rotX(bx, by, rot), rotY(bx, by, rot), w, w);
            }
        }
        const dc = Math.sqrt(2) * c / 4;
        for (let i = -2 * row; i < 2 * row; ++i) {
            for (let j = -2 * col; j < 2 * col; ++j) {
                setFillColor(cArr2[mod(i + j, cl2)]);
                setRotation(45);
                const cx = w * j + fx;
                const cy = h + (w + h) * i + fy;
                drawRect(rotX(cx - dc, cy, rot), rotY(cx - dc, cy, rot), c / 2, c / 2);
                drawRect(rotX(cx + dc, cy, rot), rotY(cx + dc, cy, rot), c / 2, c / 2);
                drawRect(rotX(cx, w + cy - dc, rot), rotY(cx, w + cy - dc, rot), c / 2, c / 2);
                drawRect(rotX(cx, w + cy + dc, rot), rotY(cx, w + cy + dc, rot), c / 2, c / 2);
                setFillColor(cArr2[mod(i + j + 1, cl2)]);
                drawRect(rotX(cx, cy - dc, rot), rotY(cx, cy - dc, rot), c / 2, c / 2);
                drawRect(rotX(cx, cy + dc, rot), rotY(cx, cy + dc, rot), c / 2, c / 2);
                drawRect(rotX(cx - dc, w + cy, rot), rotY(cx - dc, w + cy, rot), c / 2, c / 2);
                drawRect(rotX(cx + dc, w + cy, rot), rotY(cx + dc, w + cy, rot), c / 2, c / 2);
            }
        }
    } catch (e) {
        throw (e);
    } finally {
        loadOptions();
    }
}
const mod = function (a, b) {
    return (a % b + b) % b;
}
