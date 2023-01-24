import {
    MeshStandardMaterial,
    BoxGeometry,
    Mesh
} from "three";

class AssetManager {
    static assets = {
        materials: {},
        geometry: {}
    }

    static createAsset(name, type, classRef, args) {
        if (!(type in AssetManager.assets)) { return false; }
        if (name in AssetManager.assets[type]) { return AssetManager.assets[type][name]; }

        AssetManager.assets[type][name] = new classRef(...args);

        return AssetManager.assets[type][name];
    }
}

export { AssetManager }