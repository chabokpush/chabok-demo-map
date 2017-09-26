const debounce = require('debounce');

export default class Qeue {

    constructor() {
        this.qeue = [];
    }

    push(val) {
        if (this.qeue.length && this.qeue[this.qeue.length - 1].val === val) return;
        this.qeue.push({
            val,
            createAt: Date.now()
        });
    }

    set(val) {
        !!val && debounce(this.push(val), 100)
    }

    get() {
        return this.qeue.shift();
    }

}