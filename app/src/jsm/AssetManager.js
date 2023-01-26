class AssetManager {
    static assets = {
        material: {},
        geometry: {}
    }

    static createAsset(name, type, classRef, args) {
        if (!(type in AssetManager.assets)) { console.error('could not find type "' + type +'".'); return false; }
        if (name in AssetManager.assets[type]) { return AssetManager.assets[type][name]; }

        AssetManager.assets[type][name] = new classRef(...args);

        return AssetManager.assets[type][name];
    }
}

export { AssetManager }