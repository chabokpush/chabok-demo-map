
const encrypt = Symbol();
const decrypt = Symbol();
const isObject = Symbol();

export default new class Storage {

    [isObject](val) {
        return typeof val === "object";
    }

    [encrypt](val) {
        val = this[isObject](val) ? JSON.stringify(val) : val;
        return val;
    }

    [decrypt](val) {
        return val;
    }

    set(key, val) {
        localStorage.setItem(key, this[encrypt](val))
    }

    get(key) {
        const val = this[decrypt](localStorage.getItem(key));
        return this[isObject](val) ? JSON.parse(val) : val;
    }

}