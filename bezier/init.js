//variables
let stage;
let bg;

let isTicking = false;
let phase;

const width = 1000;
const height = 500;

let basePointArr = [];
let pointArr = [];
let resultPoint;
let rI;
let baseLine;
let tmpLine;
let resultLine;

let count = 0;
let interval = 0;
let maxDiv = 60;
let curDiv = 0;
let t = 0;
let divFreq = 1;

//functions
let addPoint;
let initCalc;
let calc;
let onoff;