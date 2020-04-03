//variables
let stage;

let isTicking = false;

const maxR = Math.PI;
const delta = 0.0025;
const minX = 50;
const maxX = 550;
const minY = 50;
const maxY = 550;
const width = maxX - minX;
const height = maxY - minY;
const center = (maxX + minX) / 2;
const middle = (maxY + minY) / 2;

let xArr = [];
let yArr = [];
let y0Arr = [];
let tempArr = [];
let deg = 0;
let fourierLine;
let tempLine;

let count = 0;
let interval = 0;
let isMoving = false;

let degFreq = 10;
let moveFreq = 1;
let moveCount = 0;
const maxMove = 10;

//functions
let getLine;
let initFourier;
let degUp;
let moveLine;

let fourier;
let setFourierText;
let convertPosX;
let convertPosY;

let onoff;