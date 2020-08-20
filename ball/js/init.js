let stage;
let bg;
const w = 500;
const h = 500;
const vw = 0;
let initFunc;
let tickFunc;
let isTick = false;
let ballParam = {
    x: 0,
    y: 0,
    r: 10,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    color: "red",
};
let rectParam = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
    rot: 0,
    color: "blue"
}
let curVals = {};
let cnt = 0;
let actBall;
let actRect;
let texts = [];