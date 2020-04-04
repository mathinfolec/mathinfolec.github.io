//variables
let stage;

let isTicking = false;
let phase = "init";

const maxRX = Math.PI;
const maxRY = Math.PI;
const delta = 0.0025;
const minX = 50;
const maxX = 950;
const minY = 50;
const maxY = 450;
const width = maxX - minX;
const height = maxY - minY;
const center = (maxX + minX) / 2;
const middle = (maxY + minY) / 2;

let freeXArr = [];
let freeYArr = [];
let funcXArr = [];
let funcYArr = [];
let linearArr = [];
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
let degPart = 0;

let drawStartArea;
let freeLine;
let curX = 50;
let curY;
let expText;

//functions
let getLine;
let initAxis;
let initFourier;
let degUp;
let moveLine;

let fourier;
let setDegText;
let addFourierText;
let resetFourierText;
let convertPosX;
let convertPosY;
let convertCalcX;
let convertCalcY;

let onoff;
let showTeX;

let prepareDraw;
let startDraw;
let calcAB;
let an;
let bn;
