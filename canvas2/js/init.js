"use strict";
let canvas;
let ctx;
let stage;
let bg;
const c_width = 500;
const c_height = 500;
let isTick = false;
let curVals = {};
let cnt = 0;
let curMouseX = 0;
let curMouseY = 0;
let shapes = [];
let options = {
    color: "black",
    fillColor: "black",
    strokeColor: "black",
    bgColor: "black",
    mainColor: ["black", "black"],
    subColor: ["black", "black"],
    lineWidth: 0,
    rotation: 0,
    alpha: 1
};
const defOptions = JSON.parse(JSON.stringify(options));
const bannedValName = ["canvas", "ctx", "c_width", "c_height"];

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
            url: "lec1.pdf",
            name: "資料①"
        },
        {
            url: "sample1.png",
            name: "サンプル1"
        },
        {
            url: "sample2.png",
            name: "サンプル2"
        }
    ],
    [
        {
            url: "lec2.pdf",
            name: "資料②"
        }
    ],
    [
        {
            url: "funcs.pdf",
            name: "シミュレータ機能集"
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

let isRecordable = true;
let recorder;