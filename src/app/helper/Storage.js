import store from 'store';

export default new class Storage {
    set(key, val) {
        store.set(key, val)
    }

    get(key) {
        return store.get(key);
    }

}