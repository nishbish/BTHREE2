import {
    MeshStandardMaterial,
    BoxGeometry,
    Mesh
} from "three";

import { AssetManager } from './AssetManager.js';

class Player {
    constructor() {
        this.material = AssetManager.createAsset('botSkin', 'material', MeshStandardMaterial, [{ color: 0x888888 }]);
        this.geometry = AssetManager.createAsset('botGeo', 'geometry', BoxGeometry, [1, 1, 1]);

        this.mesh = new Mesh(this.geometry, this.material);
    }
}

export { Player }