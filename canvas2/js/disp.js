const showOpt = function () {
    document.getElementById("opt-ul").style.display = "block";
    document.getElementById("opt-open").style.display = "none";
    document.getElementById("opt-close").style.display = "inline-block";
}
const hideOpt = function () {
    document.getElementById("opt-ul").style.display = "none";
    document.getElementById("opt-open").style.display = "inline-block";
    document.getElementById("opt-close").style.display = "none";
}
const setButton = function (id, value) {
    switch (id) {
        case "init":
            getButtonInitId().disabled = !value;
            break;
        case "tick":
            getButtonTickId().disabled = !value;
            break;
        case "stop":
            getButtonStopId().disabled = !value;
            break;
        case "exec":
            getButtonExecId().disabled = !value;
            break;
    }
}
const showTickButton = function (tf = true) {
    if (tf) {
        //getButtonTickId().style.display = "block";
        getButtonExecId().style.display = "block";
        getButtonStopId().style.display = "none";
    }
    else {
        getButtonTickId().style.display = "none";
        getButtonExecId().style.display = "none";
        getButtonStopId().style.display = "block";
    }
}
