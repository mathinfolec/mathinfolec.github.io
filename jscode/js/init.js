"use strict";
// data.js
let qdata = [];
let tmpCode = [];
const sections = ["順接", "分岐", "反復", "総合"];
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
