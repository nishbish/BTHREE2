import {
    MeshStandardMaterial,
    BoxGeometry,
    Mesh,
    Vector3,
    ConeGeometry,
} from "three";

import { Actor } from './Actor';
import { AssetManager } from './AssetManager.js';

class Bot extends Actor {
    constructor() {
        super();

        this.selected = false;
        this.geometry = AssetManager.createAsset('boxGeo', 'geometry', BoxGeometry, [1, 1, 1]);
        this.meshMaterial = AssetManager.createAsset('botSkin', 'material', MeshStandardMaterial, [{ color: 0x6148A1 }]);
      
        //mesh
        this.mesh = new Mesh(this.geometry, this.meshMaterial);
        this.mesh.position.y += 0.5;
        this.object.add(this.mesh);
        
        //collider
        this.collider.geometry = this.geometry;
        this.collider.visible = false;
        this.collider.position.y += 0.5;
        this.object.add(this.collider);

        //active marker
        this.markerGeo = AssetManager.createAsset('markerGeo', 'geometry', ConeGeometry, [0.2, 0.3, 3]);
        this.marker = new Mesh(this.markerGeo);
        this.marker.rotation.x = Math.PI;
        this.marker.position.set(0, 1.4, 0);
        this.object.add(this.marker);

        this.moving = false;
        this.recording = false;
        this.playing = false;
        this.commands = [];
    }

    select() {
        this.selected = true;
        this.marker.visible = true;
    }

    deSelect() {
        this.selected = false;
        this.marker.visible = false;
    }

    move(pos) {
        if (!this.selected || this.moving) { return; }
        this.oldPos = this.object.position.clone();
        
        this.moving = true;
        this.recordCommand('move', pos.clone().sub(this.oldPos));
        
        const animate = (alpha) => {
            alpha = alpha > 1 ? 1 : alpha;
            
            const lerpPos = new Vector3().lerpVectors(this.oldPos, pos, alpha);
            this.object.position.copy(lerpPos);
            
            if (alpha < 1) {
                requestAnimationFrame(() => { animate(alpha + 0.1); });
            } else {
                this.moving = false;
            }
        }

        animate(0);
    }

    recordCommand(type, data) {
        if (!this.recording) { return; }

        this.commands.push({
            type: type,
            data: data
        });

        console.log('this.commands', this.commands);
    }

    playCommands() {
        if (this.recording) { return; }
        if (this.playing) { return; }

        for (const command of this.commands) {
            
        }
    }
}

export { Bot }