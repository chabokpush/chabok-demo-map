import store from 'store';

function set(key, val) {
    store.set(key, val)
}

function get(key) {
    return store.get(key);
}

export default {
    set,
    get
}