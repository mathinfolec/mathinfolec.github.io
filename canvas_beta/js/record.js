const startRec = function () {
    if (isRecordable) {
        console.log("startrec");
        stream = document.getElementById("canvas").captureStream();
        curCtxs = [];
        capturer = new CCapture({ format: "gif", workersPath: "js/dist/" });
        capturer.start();
        render();
    }
}
function render() {
    requestAnimationFrame(render);
    capturer.capture(canvas);
}
const stopRec = function (isSuccess) {
    capturer.stop();
    capturer.save();
    isRecordable = false;
    console.log("stoprec");
    document.getElementById("span_dlstat").innerHTML = "loading...";
    //let worker = new Worker("js/record_worker.js");
    encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(Math.floor(1000 / 30));
    encoder.setSize(w, h);
    encoder.start();
    //worker.postMessage({ type: "start", fps: FPS, w: w, h: h });
    console.log("#frame=" + curCtxs.length);
    console.log(curCtxs);
    for (let i = 0; i < curCtxs.length; ++i) {
        console.log("loading...(" + (i + 1) + "/" + curCtxs.length + ")");
        //worker.postMessage({ type: "addFrame", data: curCtxs[i] });
        //encoder.addFrame(curCtxs[i], true);
        //gif.addFrame(curCtxs[i], { delay: 1000 / FPS });
    }
    document.getElementById("span_dlstat").innerHTML = "";
    encoder.finish();
    //worker.postMessage({ type: "finish" });
    if (isSuccess) {
        //worker.postMessage({ type: "download" });
        /*
        worker.onmessage = function (mes) {
            let d = mes.data;
            switch (d.type) {
                case "addFrame":
                    curFrameStat += 1;
                    break;
                case "download":
                    let link = document.createElement('a');
                    link.href = d.url;
                    link.download = 'img.gif';
                    link.click();
                    isRecordable = true;
                    break;
            }
        }
        */
        //encoder.download("img.gif");
    }
    else {
        isRecordable = true;
    }
}