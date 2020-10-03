self.addEventListener("message", function (mes) {
    switch (mes.type) {
        case "start":
            encoder = new GIFEncoder();
            encoder.setRepeat(0);
            encoder.setDelay(1000 / 30);
            encoder.setSize(w, h);
            encoder.start();
            break;
        case "addFrame":
            encoder.addFrame(mes.data, true);
            break;
        case "finish":
            encoder.finish();
            break;
        case "download":
            let bin = new Uint8Array(encoder.stream().bin);
            let blob = new Blob([bin.buffer], { type: 'image/gif' });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'img.gif';
            link.click();
            break;
    }
})