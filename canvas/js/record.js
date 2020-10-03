const startRec = function () {
    console.log("startrec");
    let stream = canvas.captureStream();
    recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
    recorder.start();
}
const stopRec = function (isSuccess) {
    console.log("stoprec");
    recorder.stop();
    if (isSuccess) {
        recorder.ondataavailable = function (e) {
            let a = document.createElement("a");
            let b = new Blob([e.data], { type: e.data.type });
            a.download = "movie.webm";
            a.href = URL.createObjectURL(b);
            a.click();
        }
        addLog("export_video");
    }
}