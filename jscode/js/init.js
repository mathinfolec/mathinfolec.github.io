"use strict";
// data.js
let qdata = [];
let tmpCode = [];
const sections = {
    "sample": "サンプルコード",
    "seq": "順接(変数や四則演算)",
    "if": "分岐(if)",
    "loop": "反復(whileループ)",
    "ex": "総合問題"
};
let curqId = undefined;
// conv.js
let flow = [];
let ins = [];
let valNum = 0;
// step.js
let curpId = 0;
let curVals = [];
let curOuts = [];
let isAuto = false;
// main.js
let prevCode = "";
