import {
    MeshStandardMaterial,
    BoxGeometry,
    Mesh,
    Clock,
    Vector3,
} from "three";

import { AssetManager } from './AssetManager.js';

class Player {
    constructor() {
        this.clock = new Clock();

        this.material = AssetManager.createAsset('botSkin', 'material', MeshStandardMaterial, [{ color: 0x6148A1 }]);
        this.geometry = AssetManager.createAsset('botGeo', 'geometry', BoxGeometry, [1, 1, 1]);
        this.mesh = new Mesh(this.geometry, this.material);

        this.moving = false;
    }

    move(newPos) {
        if (this.moving) { return; }

        this.oldPos = this.mesh.position.clone();
        this.newPos = newPos;
        
        this.moving = true;
        this._move();
    }
    
    _move(alpha = 0) {
        alpha = alpha > 1 ? 1 : alpha;

        const lerpPos = new Vector3().lerpVectors(this.oldPos, this.newPos, alpha);
        this.mesh.position.copy(lerpPos);

        if (alpha < 1) {
            requestAnimationFrame(() => { this._move(alpha + 0.1); });
        } else {
            this.moving = false;
        }
    }
}

export { Player }