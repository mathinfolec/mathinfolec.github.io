// variables
let stage;
let bg;
let phase;
const phaseStrs = ["Add", "Connect", "Move", "Divide", "Remove"];

const minX = 20;
const maxX = 730;
const minY = 20;
const maxY = 480;

let points = [];
const pointR = 15;

let p0Id = -1;

let line;

let movingPointId = -1;

let buttons = [];
const buttonX = 150;
const buttonY = 50;

// functions
let initButton;
let highlightButton;

let isConnect;
let getPointId;

let addPoint;
let setLine;
let drawLine;
let movePoint;
let dividePoint;
let removePoint;
