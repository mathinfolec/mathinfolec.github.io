const checkSliders = function () {
    const newN = Number(document.getElementById("slider_n").value);
    document.getElementById("text_n").innerHTML = newN;
    const newV = Number(document.getElementById("slider_v").value);
    document.getElementById("text_v").innerHTML = newV;
    const newR = Number(document.getElementById("slider_r").value);
    document.getElementById("text_r").innerHTML = newR;
    setShapes(newN, newV, newR);
}

