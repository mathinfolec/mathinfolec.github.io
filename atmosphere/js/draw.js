const redrawShapes = function () {
    move();
    draw();
}
const move = function () {
    for (let s of shapes) {
        s.x += s.v * Math.cos(s.angle) / FPS;
        s.y += s.v * -Math.sin(s.angle) / FPS;
        let nextDirArr = [];
        if (s.x <= s.r) {
            if (s.y >= s.r) {
                nextDirArr.push(0);
            }
            if (s.y <= height - s.r) {
                nextDirArr.push(3);
            }
        }
        if (s.x >= width - s.r) {
            if (s.y >= s.r) {
                nextDirArr.push(1);
            }
            if (s.y <= height - s.r) {
                nextDirArr.push(2);
            }
        }
        if (s.y <= s.r) {
            if (s.x >= s.r) {
                nextDirArr.push(2);
            }
            if (s.x <= width - s.r) {
                nextDirArr.push(3);
            }
        }
        if (s.y >= height - s.r) {
            if (s.x >= s.r) {
                nextDirArr.push(1);
            }
            if (s.x <= width - s.r) {
                nextDirArr.push(0);
            }
        }
        if (nextDirArr.length > 0) {
            const nextDir = nextDirArr[Math.floor(Math.random() * nextDirArr.length)];
            s.angle = Math.PI / 2 * nextDir + Math.random() * Math.PI / 2;
            //console.log("(" + s.x + "," + s.y + "), nextDirArr=" + JSON.stringify(nextDirArr));
        }
    }
}
const draw = function () {
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "orange";
    for (let s of shapes) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}