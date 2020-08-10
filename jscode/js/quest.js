const initQ = function () {
    let dol = document.getElementById("toc_ol");
    for (let i in qdata) {
        let q = qdata[i];
        let o = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("onclick", "showQ('" + i + "')");
        a.innerHTML = q.title;
        o.appendChild(a);
        dol.appendChild(o);
    }
}
const showQ = function (id) {
    if (id == curqId) {
        return;
    }
    if (id != undefined) {
        tmpCode[curqId] = getCode();
    }
    curqId = id;
    let q = qdata[id];
    let qdiv = document.getElementById("question");
    while (qdiv.childNodes.length) {
        qdiv.removeChild(qdiv.childNodes[0]);
    }
    let qtitle = document.createElement("div");
    qtitle.id = "question_title";
    qtitle.innerHTML = q.title;
    qdiv.appendChild(qtitle);
    let qexp = document.createElement("div");
    qexp.id = "question_exp";
    qexp.innerHTML = q.exp;
    qdiv.appendChild(qexp);
    let qsample = document.createElement("div");
    qsample.id = "question_sample";
    for (let i = 0; i < q.sample.length; ++i) {
        let qsint = document.createElement("div");
        qsint.className = "question_intitle";
        qsint.innerHTML = "入力例" + (i + 1);
        qsample.appendChild(qsint);
        let qsin = document.createElement("div");
        qsin.className = "question_in";
        qsin.innerHTML = q.sample[i].in;
        qsample.appendChild(qsin);
        let qsoutt = document.createElement("div");
        qsoutt.className = "question_outtitle";
        qsoutt.innerHTML = "出力例" + (i + 1);
        qsample.appendChild(qsoutt);
        let qsout = document.createElement("div");
        qsout.className = "question_out";
        qsout.innerHTML = q.sample[i].out;
        qsample.appendChild(qsout);
    }
    qdiv.appendChild(qsample);
    if (typeof tmpCode[id] == "undefined") {
        if (typeof q.defCode == "undefined") {
            setCode();
        }
        else {
            setCode(q.defCode);
        }
    }
    else {
        setCode(tmpCode[id]);
    }
    showTextArea();
    addLog("showQuestion");
}