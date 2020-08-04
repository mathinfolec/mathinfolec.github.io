setOptions = function (id) {
    for (let i in parts[id]) {
        if (parts[id][i].type == "terminal-start") {
            options[id].startId = i;
            curpIds[id] = i;
        }
        else if (parts[id][i].type == "terminal-end") {
            options[id].endId = i;
        }
        curVals[id] = {};
    }
    preset(id);
}
preset = function (id) {
    let queue = [options[id].startId];
    parts[id][options[id].startId].depth = 0;
    parts[id][options[id].startId].padding = 0;
    let maxDepth = 0;
    let maxPadding = 0;
    while (queue.length) {
        let pId = queue.shift();
        let i;
        switch (parts[id][pId].type) {
            case "terminal-start":
            case "process":
            case "process-let":
            case "process-any":
            case "for-end":
            case "while-end":
            case "nothing":
                i = parts[id][pId].next;
                parts[id][i].depth = parts[id][pId].depth + 1;
                if (typeof parts[id][i].padding == "undefined") {
                    parts[id][i].padding = parts[id][pId].padding;
                }
                else {
                    parts[id][i].padding = Math.min(parts[id][i].padding, parts[id][pId].padding);
                }
                maxDepth = parts[id][i].depth;
                maxPadding = Math.max(maxPadding, parts[id][i].padding);
                queue.push(i);
                break;
            case "for-range":
            case "for-range-blank":
            case "while":
            case "while-blank":
                i = parts[id][pId].next;
                parts[id][i].depth = parts[id][pId].depth + 1;
                if (typeof parts[id][i].padding == "undefined") {
                    parts[id][i].padding = parts[id][pId].padding;
                }
                else {
                    parts[id][i].padding = Math.min(parts[id][i].padding, parts[id][pId].padding);
                }
                maxDepth = parts[id][i].depth;
                maxPadding = Math.max(maxPadding, parts[id][i].padding);
                queue.push(i);
                // connect for-range and for-end
                i = parts[id][pId].end;
                parts[id][i].start = pId;
                if (typeof parts[id][i].padding == "undefined") {
                    parts[id][i].padding = parts[id][pId].padding;
                }
                else {
                    parts[id][i].padding = Math.min(parts[id][i].padding, parts[id][pId].padding);
                }
                // set array for loop
                if (parts[id][pId].type == "for-range") {
                    let rangeStrArr = (parts[id][pId].name).trim().split("of");
                    parts[id][pId].prop = {
                        valName: rangeStrArr[0].trim(),
                        range: rangeStrArr[1].trim(),
                        isInited: false,
                        remains: []
                    };
                }
                else if (parts[id][pId].type == "for-range-blank") {
                    parts[id][pId].prop.range = null;
                    parts[id][pId].prop.isInited = false;
                    parts[id][pId].prop.remains = [];
                }
                break;
            case "if-else":
            case "if-blank":
                i = parts[id][pId].next[0];
                parts[id][i].depth = parts[id][pId].depth + 1;
                if (typeof parts[id][i].padding == "undefined") {
                    parts[id][i].padding = parts[id][pId].padding;
                }
                else {
                    parts[id][i].padding = Math.min(parts[id][i].padding, parts[id][pId].padding);
                }
                queue.push(i);
                i = parts[id][pId].next[1];
                if (i == parts[id][pId].conv) {
                    let nId = getNewId(id);
                    parts[id][pId].next[1] = nId;
                    parts[id][nId] = {
                        type: "nothing",
                        depth: parts[id][pId].depth + 1,
                        padding: parts[id][pId].padding + 1,
                        next: parts[id][pId].conv
                    };
                    parts[id][i].depth = parts[id][pId].depth + 2;
                    if (typeof parts[id][i].padding == "undefined") {
                        parts[id][i].padding = parts[id][pId].padding;
                    }
                    else {
                        parts[id][i].padding = Math.min(parts[id][i].padding, parts[id][pId].padding);
                    }
                }
                else {
                    parts[id][i].depth = parts[id][pId].depth + 1;
                    if (typeof parts[id][i].padding == "undefined") {
                        parts[id][i].padding = parts[id][pId].padding + 1;
                    }
                    else {
                        parts[id][i].padding = Math.min(parts[id][i].padding, parts[id][pId].padding + 1);
                    }
                }
                maxDepth = parts[id][i].depth;
                maxPadding = Math.max(maxPadding, parts[id][i].padding);
                queue.push(i);
                break;
            case "terminal-end":
                break;
        }
    }
    for (let i in parts[id]) {
        if (parts[id][i].type == "if-else" || parts[id][i].type == "if-blank") {
            let sf = false;
            for (let j in parts[id]) {
                if (parts[id][i].depth == parts[id][j].depth) {
                    if (parts[id][i].padding == parts[id][j].padding - 1) {
                        sf = true;
                        break;
                    }
                }
            }
            if (sf) {
                for (let j in parts[id]) {
                    if (parts[id][i].depth == parts[id][j].depth) {
                        if (parts[id][i].padding < parts[id][j].padding) {
                            parts[id][j].padding += 1;
                            maxPadding = Math.max(maxPadding, parts[id][j].padding);
                        }
                    }
                }
            }
        }
    }
    for (let i in parts[id]) {
        for (let j in parts[id]) {
            if (i == j) continue;
            if (parts[id][i].depth == parts[id][j].depth && parts[id][i].padding == parts[id][j].padding) {
                parts[id][j].padding++;
                maxPadding = Math.max(maxPadding, parts[id][j].padding);
            }
        }
    }
    options[id].maxDepth = maxDepth;
    options[id].maxPadding = maxPadding;
}