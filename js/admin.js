const adm = function () {
    isAdmin = !isAdmin;
    return isAdmin;
}
const setAdmin = function (logs) {
    let d = document.getElementById("admin");
    const dispType = ["whole", "tick", "init", "error_init", "error_tick"];
    admLogs = {};
    for (let i of dispType) {
        admLogs[i] = [];
    }
    curAdmIds = {};
    for (let i in logs) {
        admLogs["whole"].push(logs[i]);
        if (typeof admLogs[logs[i].type] == "undefined") {
            //admLogs[logs[i].type] = [logs[i]];
        }
        else {
            admLogs[logs[i].type].push(logs[i]);
        }
    }
    while (d.childNodes.length) {
        d.removeChild(d.childNodes[0]);
    }
    let table = document.createElement("table");
    for (let i in admLogs) {
        if (admLogs[i].length == 0) {
            continue;
        }
        curAdmIds[i] = 0;
        let tr = document.createElement("tr");
        let td0 = document.createElement("td");
        td0.innerHTML = i;
        td0.id = "admName_" + i;
        td0.onclick = function () {
            changeAdmType(i);
        }
        tr.appendChild(td0);
        let td1 = document.createElement("td");
        let b0 = document.createElement("button");
        b0.innerHTML = "<<";
        b0.onclick = function () {
            setAdmPrev(i);
        }
        td1.appendChild(b0);
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.id = "adm_" + i;
        td2.innerHTML = admLogs[i][0].time;
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        let b1 = document.createElement("button");
        b1.innerHTML = ">>";
        b1.onclick = function () {
            setAdmNext(i);
        }
        td3.appendChild(b1);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
    d.appendChild(table);
    applyAdmLog(admLogs.whole[0]);
    changeAdmType("whole");
    d.style.display = "block";
    console.log(admLogs);
}
const changeAdmType = function (id) {
    curAdmType = id;
    applyAdmLog(admLogs[id][curAdmIds[id]]);
    for (let i in admLogs) {
        if (admLogs[i].length == 0) {
            continue;
        }
        document.getElementById("admName_" + i).style.color = (i == id ? "red" : "black");
    }
}
const setAdmPrev = function (id) {
    stop();
    if (curAdmIds[id] > 0) {
        curAdmIds[id] -= 1;
    }
    document.getElementById("adm_" + id).innerHTML = admLogs[id][curAdmIds[id]].time;
    if (id == curAdmType) {
        applyAdmLog(admLogs[id][curAdmIds[id]]);
    }
}
const setAdmNext = function (id) {
    stop();
    if (curAdmIds[id] < admLogs[id].length - 1) {
        curAdmIds[id] += 1;
    }
    document.getElementById("adm_" + id).innerHTML = admLogs[id][curAdmIds[id]].time;
    if (id == curAdmType) {
        applyAdmLog(admLogs[id][curAdmIds[id]]);
    }
}
const applyAdmLog = function (log) {
    stop();
    changeSlot(log.slot);
    getCodeInitId().value = log.init;
    getCodeTickId().value = log.tick;
}