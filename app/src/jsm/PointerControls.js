import {
    EventDispatcher,
    Vector2,
    Raycaster,
} from "three";

class PointerControls extends EventDispatcher {
    constructor(canvas, camera) {
        super();

        this.clickTimer = 250;
        this.canvas = canvas;
        this.camera = camera;
        this.targets = [];
        this.raycaster = new Raycaster();
        this.pointerDown = null;
        this.pointerUp = null;

        this.canvas.addEventListener('pointerdown', (e) => { this.pointer(e, 'pointerdown') });
        this.canvas.addEventListener('pointerup', (e) => { this.pointer(e, 'pointerup') });
    }

    pointer(e, type) {
        const rect = this.canvas.getBoundingClientRect();
        
        const clickPos = new Vector2(
            ((e.clientX - rect.x) / rect.width) * 2 - 1,
            -((e.clientY - rect.y) / rect.height) * 2 + 1
        );

        this.raycaster.setFromCamera(clickPos, this.camera);
        const intersects = this.raycaster.intersectObjects(this.targets, false);
        const intersect = intersects.length > 0 ? intersects[0] : null;

        this[type] = {
            event: e,
            intersect: intersect,
        }

        this.dispatchEvent({
            type: type,
            ...this[type]
        });

        if (type === 'pointerup' && this.pointerdown &&
        intersect && this.pointerdown.intersect.object === this.pointerup.intersect.object &&
        this.pointerup.event.timeStamp - this.pointerdown.event.timeStamp < this.clickTimer) {
            this.dispatchEvent({
                type: 'click',
                pointerdown: this.pointerdown,
                pointerup: this.pointerup,
                intersect: intersect,
            });
        }
    }
}

export { PointerControls }