import {
    EventDispatcher,
    Vector2,
    Raycaster,
} from "three";

class Pointer3D extends EventDispatcher {
    constructor(bbb, target) {
        super();

        this.canvas = bbb.renderer.domElement;
        this.camera = bbb.camera;
        this.scene = bbb.scene;
        this.target = target;
        this.raycaster = new Raycaster();

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
        const intersects = this.raycaster.intersectObject(this.target, false);

		for (let intersect of intersects) {
			if (this.target === intersect.object) {
                this.dispatchEvent({
                    type: type,
                    event: e,
                    intersect: intersect
                });

                break;
            }
		}
    }
}

export { Pointer3D }