"use strict";
let stage;
let bg;
const w = 500;
const h = 500;
let isTick = false;
/*
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
*/
let curVals = {};
let cnt = 0;
//let actBall;
//let traceBalls = [];
//let traceRects = [];
//let actRect;
//let texts = [];

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
    [
        {
            url: "slide1.pdf",
            name: "第1回授業スライド"
        },
        {
            url: "lec1_sample1.gif",
            name: "サンプル1"
        },
        {
            url: "lec1_ex3.gif",
            name: "演習3"
        },
        {
            url: "lec1_ex4.gif",
            name: "演習4"
        }
    ],
    [
        {
            url: "slide2.pdf",
            name: "第2回授業スライド"
        },
        {
            url: "lec2_sample1.gif",
            name: "サンプル1"
        },
        {
            url: "lec2_sample2.gif",
            name: "サンプル2"
        },
        {
            url: "lec2_sample3.gif",
            name: "サンプル3"
        },
        {
            url: "lec2_ex3.gif",
            name: "演習3"
        },
        {
            url: "lec2_ex4.gif",
            name: "演習4"
        },
        {
            url: "lec2_ex5.gif",
            name: "演習5"
        }
    ],
    [
        {
            url: "slide3.pdf",
            name: "第3回授業スライド"
        },
        {
            url: "lec3_sample1.gif",
            name: "サンプル1"
        },
        {
            url: "lec3_ex3.gif",
            name: "演習3"
        },
        {
            url: "lec3_ex4.gif",
            name: "演習4"
        },
        {
            url: "lec3_ex5.gif",
            name: "演習5"
        }
    ],
    [
        {
            url: "slide4.pdf",
            name: "第4回,第5回授業スライド"
        },
        {
            url: "funcs.pdf",
            name: "シミュレータ機能集"
        }
    ],
    [
        {
            url: "work1.gif",
            name: "作品例1"
        },
        {
            url: "work2.gif",
            name: "作品例2"
        },
        {
            url: "work3.gif",
            name: "作品例3"
        },
        {
            url: "work4.gif",
            name: "作品例4"
        },
        {
            url: "work5.gif",
            name: "作品例5"
        }
    ]
];
let urls = ["default"];
const defUrls = JSON.parse(JSON.stringify(urls));

let prevURLStr;

let isAdmin = false;
let admLogs = {};
let curAdmIds = {};
let curAdmType = "whole";

let ctx;
let encoder;
let curCtxs = [];
let isRecordable = true;