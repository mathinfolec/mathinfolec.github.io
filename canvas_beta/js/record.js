const startRec = function () {
    console.log("startrec");
    capturer = new CCapture({ format: "gif", workersPath: "js/dist/" });
    capturer.start();
    render();
}
const render = function () {
    requestAnimationFrame(render);
    capturer.capture(canvas);
}
const stopRec = function (isSuccess) {
    console.log("stoprec");
    capturer.stop();
    if (isSuccess) {
        capturer.save();
        addLog("export_gif");
    }
}