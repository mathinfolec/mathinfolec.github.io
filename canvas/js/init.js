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
            url: "lec1_ex2.gif",
            name: "演習2"
        },
        {
            url: "lec1_ex3.gif",
            name: "演習3"
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
            url: "lec2_ex2.gif",
            name: "演習2"
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
            caption: "(1)横の壁を跳ね返りではなくすり抜けられるように、if文の中身を変更できるか？<br/>"
                + "(2)中央に白い線を引けるか？<br/>"
                + "(3)中央の線の左右でそれぞれ円の色を変えられるか？"
        },
        {
            url: "work2.gif",
            name: "作品例2",
            caption: "(1)跳ね返る度に円の大きさを徐々に小さくできるか？<br/>"
                + "(2)円の大きさの最小値を設定できるか？<br/>"
                + "(3)円に模様をつけられるか？"
        },
        {
            url: "work3.gif",
            name: "作品例3",
            caption: "(1)正方形を大きくすることができるか？<br/>"
                + "(2)正方形が最大まで大きくなったら今度は小さくし、また最小になったら大きくするようできるか？<br/>"
                + "(3)現在大きくなっているか/小さくなっているかによって正方形の色を変えられるか？"
        },
        {
            url: "work4.gif",
            name: "作品例4",
            caption: "(1)赤い円の周囲にピンクの正方形2つを表示し動かせるか？(円のパラメータ表示を使う)<br/>"
                + "(2)ピンクの正方形2つそのものを回転させられるか？<br/>"
                + "(3)マウスが赤い円上にある時に移動方向を反転させられるか？"

        },
        {
            url: "work5.gif",
            name: "作品例5",
            caption: "(1)円の現在の位置からマウスの位置へのベクトルを計算できるか？<br/>"
                + "(2)ベクトルの長さを調整し、円が一定速度で動くように設定できるか？</br>"
                + "(3)円とマウスの距離が近い場合にぴったりと止まれるか(ガタガタと動かないか)？"
        }
    ]
];
let urls = ["default"];
const defUrls = JSON.parse(JSON.stringify(urls));

let prevURLStr;
