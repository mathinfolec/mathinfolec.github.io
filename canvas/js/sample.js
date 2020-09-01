const showSample = function (id) {
    window.open("img/" + id + ".gif");
}
const setupSamples = function () {
    let u = getUlSamplesId();
    for (let i in samples) {
        let l = document.createElement("li");
        l.innerHTML = "<a data-touch='false' data-fancybox='images' href='img/" + i + ".gif'>" + samples[i] + "</a>";
        u.appendChild(l);
    }
    $.fancybox.defaults.keyboard = false;
    $.fancybox.defaults.arrows = false;
    $.fancybox.defaults.infobar = false;
    $.fancybox.defaults.buttons = ["close"];
    $.fancybox.defaults.wheel = false;
    $.fancybox.defaults.protect = true;
    $.fancybox.defaults.touch.vertical = false;
    $.fancybox.defaults.touch.momentum = false;
    $.fancybox.defaults.clickContent = function (current, event) {
        return current.type == false;
    }
}