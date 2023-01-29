class GUI {
    static get(selector, parent = document) {
        return GUI._get(selector, parent);
    }

    static getAll(selector, parent = document) {
        return GUI._get(selector, parent, true);
    }

    static _get(selector, parent, all = false) {
        return parent['querySelector' + (all ? 'All' : '')](selector);
    }
}

export { GUI }