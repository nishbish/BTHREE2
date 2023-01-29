import {
    EventDispatcher,
    MeshStandardMaterial,
    BoxGeometry,
    Group,
    Mesh,
    Vector3,
} from "three";

import { AssetManager } from './AssetManager.js';
import { Pointer3D } from './Pointer3D.js';

class Player extends EventDispatcher {
    constructor(canvas, camera) {
        super();

        this.material = AssetManager.createAsset('botSkin', 'material', MeshStandardMaterial, [{ color: 0x6148A1 }]);
        this.geometry = AssetManager.createAsset('botGeo', 'geometry', BoxGeometry, [1, 1, 1]);
        this.object = new Mesh();
        this.object.mesh = new Mesh(this.geometry, this.material);
        this.object.mesh.position.y += 0.5;
        this.object.add(this.object.mesh);

        this.moving = false;

        this.pointer3d = new Pointer3D(canvas, camera, this.object);

        this.pointer3d.addEventListener('pointerUp', (e) => {
            this.dispatchEvent({
                type: 'pointerUp',
                event: e
            });
        });

        this.pointer3d.addEventListener('pointerDown', (e) => {
            this.dispatchEvent({
                type: 'pointerDown',
                event: e
            });
        });
    }

    move(dir) {
        if (this.moving) { return; }

        this.oldPos = this.object.position.clone();
        this.newPos = this.object.position.clone().add(dir);
        this.moving = true;
        
        const animate = (alpha) => {
            alpha = alpha > 1 ? 1 : alpha;
            
            const lerpPos = new Vector3().lerpVectors(this.oldPos, this.newPos, alpha);
            this.object.position.copy(lerpPos);
            
            if (alpha < 1) {
                requestAnimationFrame(() => { animate(alpha + 0.1); });
            } else {
                this.moving = false;
            }
        }

        animate(0);
    }
}

export { Player }