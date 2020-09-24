const setAdmin = function (logs) {
    let d = document.getElementById("admin");
    admLogs = { "whole": [], "tick": [] };
    for (let i in logs) {
        admLogs["whole"].push(logs[i]);
        if (typeof admLogs[logs[i].type] == "undefined") {
            admLogs[logs[i].type] = [logs[i]];
        }
        else {
            admLogs[logs[i].type].push(logs[i]);
        }
    }
    while (d.childNodes.length) {
        d.removeChild(d.childNodes[0]);
    }
    for (let i in admLogs) {
        let dd = document.createElement("div");
        dd.innerHTML = i;
        d.appendChild(dd);
    }
    d.style.display = "block";
    console.log(admLogs);
}