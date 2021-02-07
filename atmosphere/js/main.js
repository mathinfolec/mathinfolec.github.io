window.addEventListener("load", function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    checkSliders();
    setInterval(redrawShapes, 1000 / FPS);
    document.getElementById("sliders").addEventListener("input", checkSliders);
});
