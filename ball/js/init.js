"use strict";
let stage;
let bg;
const w = 500;
const h = 500;
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
    trace: 0
};
const defBallParam = JSON.parse(JSON.stringify(ballParam));
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
    color: "blue",
    trace: 0
};
const defRectParam = JSON.parse(JSON.stringify(rectParam));
let curVals = {};
let cnt = 0;
let actBall;
let traceBalls = [];
let traceRects = [];
let actRect;
let texts = [];

let keyList = [];

let errorMes = null;

let logs = [];
let isAddedLog = false;
let logInterval = 0;
const defLogInterval = 20;
let initCodeStr = "";
let tickCodeStr = "";
let prevInitCodeStr = "";
let prevTickCodeStr = "";

let curSlot = 0;
let saveInitCodes = [];
let saveTickCodes = [];
const maxSlot = 5;