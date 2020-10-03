const startRec = function () {
    console.log("startrec");
    curCtxs = [];
    isRecordable = false;
}
const stopRec = function (isSuccess) {
    console.log("stoprec");
    document.getElementById("span_dlstat").innerHTML = "loading...";
    let i = 0;
    let worker = new Worker("js/record_worker.js");
    /*
    encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(1000 / 30);
    encoder.setSize(w, h);
    encoder.start();
    */
    worker.postMessage({ type: "start", fps: FPS, w: w, h: h });
    for (let c of curCtxs) {
        console.log("loading...(" + (++i) + "/" + curCtxs.length + ")");
        worker.postMessage({ type: "addFrame", data: c });
        /*
        encoder.addFrame(c, true);
        t.text = "loading...(" + (++i) + "/" + curCtxs.length + ")";
        c2.update();
        */
    }
    document.getElementById("span_dlstat").innerHTML = "";
    worker.postMessage({ type: "finish" });
    //encoder.finish();
    if (isSuccess) {
        worker.postMessage({ type: "download" });
        worker.onmessage = function (mes) {
            let d = mes.data;
            switch (d.type) {
                case "download":
                    let bin = new Uint8Array(encoder.stream().bin);
                    let blob = new Blob([bin.buffer], { type: 'image/gif' });
                    let link = document.createElement('a');
                    link.href = d.url;
                    link.download = 'img.gif';
                    link.click();
                    isRecordable = true;
                    break;
            }
        }
        /*
        let bin = new Uint8Array(encoder.stream().bin);
        let blob = new Blob([bin.buffer], { type: 'image/gif' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'img.gif';
        link.click();
        */
    }
    else {
        isRecordable = true;
    }
}