drawCanvas = function (id) {
    options[id].width = getX(options[id].maxPadding) + getW() + 20;
    options[id].height = getY(options[id].maxDepth) + getH() + 20;
    document.getElementById("main").innerHTML += "<div id='" + id + "'></div><div class='clear'><hr/>";
    let d = document.getElementById(id);
    d.innerHTML = "<h2>" + options[id].title + "</h2>";
    d.innerHTML += "<div id='" + getExpId(id) + "'></div>";
    d.innerHTML += "<div id='" + getCanvasAreaId(id) + "' style='position: relative;'></div>";
    d.innerHTML += "<canvas width=" + options[id].width + " height=" + options[id].height + " id='" + getCanvasId(id) + "'></canvas></div>";
    //d.innerHTML += "<button onclick=\"execFunc('" + this.#id + "')\">一括実行</button>";
    d.innerHTML += "<button onclick=\"autoStep('" + id + "')\">実行</button>";
    d.innerHTML += "<button onclick=\"step('" + id + "')\">ステップ</button>";
    d.innerHTML += "<button onclick=\"resetStep('" + id + "')\">リセット</button>";
    d.innerHTML += "<div id='" + getValsId(id) + "' class='out'></div>";
    d.innerHTML += "<hr/>";
    d.innerHTML += "<div id='" + getOutId(id) + "' class='out'></div>";
    if (typeof options[id].vals != "undefined") {
        document.getElementById(this.getValsId(id)).innerHTML = "<br/>".repeat(options[id].vals.length);
    }
    //document.getElementById(this.#oId).style.height = (this.#height - 30) + "px";
}