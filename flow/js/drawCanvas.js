const drawCanvas = function (id) {
    options[id].width = getX(options[id].maxPadding) + getW() + 20;
    options[id].height = getY(options[id].maxDepth) + getH() + 20;
    document.getElementById("main").innerHTML += "<div id='" + id + "'></div><div class='clear'><hr/>";
    let d = document.getElementById(id);
    d.innerHTML = "<h2>" + options[id].title + "</h2>";
    d.innerHTML += "<div id='" + getExpId(id) + "'></div>";
    d.innerHTML += "<div id='" + getCanvasAreaId(id) + "' style='position: relative;'></div>";
    d.innerHTML += "<canvas width=" + options[id].width + " height=" + options[id].height + " id='" + getCanvasId(id) + "'></canvas></div>";
    d.innerHTML += "<button onclick=\"clickAutoStep('" + id + "')\">実行</button>";
    d.innerHTML += "<button onclick=\"clickStep('" + id + "')\">ステップ</button>";
    d.innerHTML += "<button onclick=\"clickResetStep('" + id + "')\">リセット</button>";
    d.innerHTML += "<div id='" + getValsId(id) + "' class='out'></div>";
    d.innerHTML += "<hr/>";
    d.innerHTML += "<div id='" + getOutId(id) + "' class='out'></div>";
    if (typeof options[id].vals != "undefined") {
        document.getElementById(getValsId(id)).innerHTML = "<br/>".repeat(options[id].vals.length);
    }
    document.getElementById("toc-ol").innerHTML += "<li><a href='#" + id + "'>" + options[id].title + "</a></li>";
}