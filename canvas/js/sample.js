const showSample = function (id) {
    window.open("img/" + id + ".gif");
}
const setupSamples = function () {
    let u = getUlSamplesId();
    for (let i in samples) {
        let l = document.createElement("li");
        l.innerHTML = "<a data-fancybox='images' href='img/" + i + ".gif' onclick='clickSample(\"" + i + "\")'>" + samples[i] + "</a>";
        u.appendChild(l);
    }
    $.fancybox.defaults.arrows = false;
    $.fancybox.defaults.infobar = false;
    $.fancybox.defaults.buttons = ["download", "close"];
}