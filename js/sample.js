const showSample = function (id) {
    window.open("img/" + id + ".gif");
}
const setupSamples = function () {
    let u = getUlSamplesId();
    urls = defUrls;
    let ind = 0;
    for (let r of refs) {
        let l = document.createElement("li");
        let iArr = [];
        for (let x of r) {
            let str = "<a data-touch='false' data-fancybox='images'";
            str += " href='ref/" + x.url + "'";
            if (typeof x.caption != "undefined") {
                str += " data-caption='" + x.caption + "'";
            }
            str += ">";
            str += x.name;
            str += "</a>";
            iArr.push(str);
            urls[++ind] = x.url;
        }
        l.innerHTML = iArr.join("&ensp;/&ensp;");
        u.appendChild(l);
    }
    /*
    for (let i in samples) {
        let l = document.createElement("li");
        l.innerHTML = "<a data-touch='false' data-fancybox='images' href='img/" + i + ".gif'>" + samples[i] + "</a>";
        u.appendChild(l);
    }
    */
    $(document).ready(function () {
        $('.fancybox').fancybox();
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
    });
}
const getRefName = function (url) {
    let a = url.split("#");
    if (a.length == 1) {
        return urls[0];
    }
    else {
        let id = Number(a[1].replace(/images-/, ""));
        if (isNaN(id)) {
            return "#" + a[1];
        }
        else {
            return urls[id];
        }
    }
}