import {
    EventDispatcher,
    MeshStandardMaterial,
    BoxGeometry,
    Group,
    Mesh,
    Vector3,
    ConeGeometry,
} from "three";

import { AssetManager } from './AssetManager.js';

class Bot extends EventDispatcher {
    constructor() {
        super();

        this.object = new Group();
        this.object.name = 'bot';

        this.geometry = AssetManager.createAsset('boxGeo', 'geometry', BoxGeometry, [1, 1, 1]);
        this.meshMaterial = AssetManager.createAsset('botSkin', 'material', MeshStandardMaterial, [{ color: 0x6148A1 }]);
      
        //mesh
        this.mesh = new Mesh(this.geometry, this.meshMaterial);
        this.mesh.name = 'bot mesh';
        this.mesh.position.y += 0.5;
        this.object.add(this.mesh);
        
        //collider
        this.collider = new Mesh(this.geometry);
        this.collider.name = 'bot collider';
        this.collider.bot = this;
        this.collider.visible = false;
        this.collider.position.y += 0.5;
        this.object.add(this.collider);

        //active marker
        this.markerGeo = AssetManager.createAsset('markerGeo', 'geometry', ConeGeometry, [0.2, 0.3, 3]);
        this.marker = new Mesh(this.markerGeo);
        this.marker.name = 'bot marker';
        this.marker.rotation.x = Math.PI;
        this.marker.position.set(0, 1.4, 0);
        this.object.add(this.marker);

        this.moving = false;
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

export { Bot }