import {
    EventDispatcher,
    MeshStandardMaterial,
    BoxGeometry,
    Group,
    Mesh,
    Vector3,
    TetrahedronGeometry,
} from "three";

import { AssetManager } from './AssetManager.js';
import { Pointer3D } from './Pointer3D.js';

class Player extends EventDispatcher {
    constructor(bbb) {
        super();

        this.object = new Group();

        this.geometry = AssetManager.createAsset('boxGeo', 'geometry', BoxGeometry, [1, 1, 1]);
        this.meshMaterial = AssetManager.createAsset('botSkin', 'material', MeshStandardMaterial, [{ color: 0x6148A1 }]);
      
        //mesh
        this.mesh = new Mesh(this.geometry, this.meshMaterial);
        this.mesh.position.y += 0.5;
        this.object.add(this.mesh);
        
        //collider
        this.collider = new Mesh(this.geometry);
        this.collider.visible = false;
        this.collider.position.y += 0.5;
        this.object.add(this.collider);

        //active marker
        this.markerGeo = AssetManager.createAsset('markerGeo', 'geometry', TetrahedronGeometry);
        this.marker = new Mesh(this.markerGeo);
        this.marker.scale.set(0.3, 0.3, 0.3);
        this.marker.position.set(0, 1.2, 0);
        this.marker.visible = false;
        this.object.add(this.marker);

        this.moving = false;
        this.pointerDown = null;

        this.pointer3d = new Pointer3D(bbb, this.collider);

        this.pointer3d.addEventListener('pointerdown', (e) => {
            this.pointerDown = e;
        });
        
        this.pointer3d.addEventListener('pointerup', (e) => {
            if (this.pointerDown && e.event.timeStamp - this.pointerDown.event.timeStamp > 200) { return; }

            this.dispatchEvent({
                type: 'click',
                pointerDown: this.pointerDown,
                pointerUp: e
            });

            this.pointerDown = null;
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