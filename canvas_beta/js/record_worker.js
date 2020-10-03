if (typeof window == "undefined") {
    importScripts("jsgif/LZWEncoder.js", "jsgif/NeuQuant.js", "jsgif/GIFEncoder.js", "jsgif/b64.js");
}
onmessage = function (mes) {
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
            let binary_gif = encoder.stream().getData();
            let data_url = "data:image/gif;base64," + encode64(binary_gif);
            console.log(data_url);
            postMessage({ type: "download", encoder: String(encoder) });
            break;
    }
};