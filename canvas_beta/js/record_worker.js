self.addEventListener("message", function (mes) {
    importScripts("jsgif/LZWEncoder.js", "jsgif/NeuQuant.js", "jsgif/GIFEncoder.js", "jsgif/b64.js");
    importScripts("init.js");
    let d = mes.data;
    console.log(d.type);
    switch (d.type) {
        case "start":
            encoder = new GIFEncoder();
            encoder.setRepeat(0);
            encoder.setDelay(d.fps);
            encoder.setSize(d.w, d.h);
            encoder.start();
            break;
        case "addFrame":
            encoder.addFrame(d.data, true);
            break;
        case "finish":
            encoder.finish();
            break;
        case "download":
            console.log("download");
            let bin = new Uint8Array(encoder.stream().bin);
            let blob = new Blob([bin.buffer], { type: 'image/gif' });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'img.gif';
            link.click();
            break;
    }
})