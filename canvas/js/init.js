"use strict";
let stage;
let bg;
const w = 500;
const h = 500;
let isTick = false;
let ballParam = {
    x: 0,
    y: 0,
    r: 0,
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

let shapes = [];
let options = {
    color: "black",
    rotation: 0,
    alpha: 1
};
const defOptions = JSON.parse(JSON.stringify(options));

let keyList = [];

let errorMes = null;

const FPS = 30;

let logs = [];
let isAddedLog = false;
let logInterval = 0;
const defLogInterval = FPS;
let initCodeStr = "";
let tickCodeStr = "";
let prevInitCodeStr = "";
let prevTickCodeStr = "";

let curSlot = 1;
let saveInitCodes = [];
let saveTickCodes = [];
const maxSlot = 5;

const refs = [
    {
        "slide1.pdf": "第1回授業スライド",
        "lec1_sample1.gif": "サンプル1",
        "lec1_sample2.gif": "サンプル2",
        "lec1_sample3.gif": "サンプル3",
        "lec1_ex3.gif": "演習3",
        "lec1_ex4.gif": "演習4"
    },
    {
        "slide2.pdf": "第2回授業スライド",
        "lec2_sample1.gif": "サンプル1",
        "lec2_sample2.gif": "サンプル2",
        "lec2_sample3.gif": "サンプル3",
        "lec2_ex3.gif": "演習3",
        "lec2_ex4.gif": "演習4"
    },
    {
        "slide3.pdf": "第3回授業スライド",
        "lec3_sample1.gif": "サンプル1",
        "lec3_ex2.gif": "演習2",
        "lec3_ex3.gif": "演習3"
    },
    {
        "slide4.pdf": "第4回授業スライド",
        "funcs.pdf": "シミュレータ機能集"
    }
];
let urls = ["default"];
const defUrls = JSON.parse(JSON.stringify(urls));

let prevURLStr;