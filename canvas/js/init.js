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
            url: "lec1_sample2.gif",
            name: "サンプル2"
        },
        {
            url: "lec1_sample3.gif",
            name: "サンプル3"
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
            url: "lec3_ex2.gif",
            name: "演習2"
        },
        {
            url: "lec3_ex3.gif",
            name: "演習3"
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
            name: "作品例1",
            caption: "(1)左右の壁をすり抜けるには、左右の壁にめり込む条件とその時に座標がどう変わるかを計算すればよい<br/>"
                + "(2)現在のx座標の値に応じて分岐し、それぞれでsetColorを実行すると考える"
        },
        {
            url: "work2.gif",
            name: "作品例2",
            caption: "(1)跳ね返る度に半径を小さくする<br/>"
                + "(2)円に合わせてひし形を配置する(drawRectやsetRotationを使う)"
        },
        {
            url: "work3.gif",
            name: "作品例3",
            caption: "(1)正方形の座標ではなく幅,高さに速度を持たせると考える<br/>"
                + "(2)現在の速度(大きくなる/小さくなる)に応じてsetColorの設定を変える"
        },
        {
            url: "work4.gif",
            name: "作品例4",
            caption: "(1)2つの正方形の座標は円のパラメータ表示で実現できる"
        },
        {
            url: "work5.gif",
            name: "作品例5",
            caption: "(1)マウスの座標と現在の円の座標を使い、円の速度ベクトルを計算する<br/>"
                + "(2)速度ベクトルの大きさが一定になるように調整する"
        }
    ]
];
let urls = ["default"];
const defUrls = JSON.parse(JSON.stringify(urls));

let prevURLStr;
