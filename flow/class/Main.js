class Main {
    #flows = {}
    #curId = null;
    constructor() {
        for (let i in parts) {
            console.log(i);
            this.#flows[i] = new Flow(i);
        }
        for (let i in this.#flows) {
            this.#flows[i].draw();
        }
    }
    update() {
        for (let i in this.#flows) {
            this.#flows[i].update();
        }
    }
    print(x) {
        document.getElementById(this.getCurOutId()).innerHTML += x + "<br/>";
    }
    updateVals(vals) {
        this.#flows[this.#curId].updateVals(vals);
    }
    exec(id) {
        this.#flows[id].exec();
    }
    step(id) {
        this.#flows[id].step();
    }
    resetStep(id) {
        this.#flows[id].resetStep();
    }
    autoStep(id) {
        for (let i in this.#flows) {
            if (i == id) {
                this.#flows[i].autoStep();
            }
            else {
                this.#flows[i].stopAutoStep();
            }
        }

    }
    getOutId(id) {
        return this.#flows[id].getOutId();
    }
    getCurId() {
        return this.#curId;
    }
    setCurId(id) {
        this.#curId = id;
    }
    getCurOutId() {
        if (this.#curId == null) return null;
        return this.#flows[this.#curId].getOutId(this.#curId);
    }
}