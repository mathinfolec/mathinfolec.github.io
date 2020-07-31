class Main {
    #flows = {}
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
    exec(id) {
        this.#flows[id].exec();
    }
    getOutId(id) {
        //console.log(id);
        //console.log(this.#flows[id]);
        return this.#flows[id].getOutId(id);
    }
}