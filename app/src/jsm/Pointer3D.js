import {
    EventDispatcher,
    Vector2,
    Raycaster,
} from "three";

class Pointer3D extends EventDispatcher {
    constructor(canvas, camera, target) {
        super();

        this.canvas = canvas;
        this.camera = camera;
        this.target = target;
        this.raycaster = new Raycaster();

        canvas.addEventListener('pointerdown', (e) => { this.pointerDown(e) });
        canvas.addEventListener('pointerup', (e) => { this.pointerUp(e) });
    }

    pointerDown(e) {
        //if (this.target !== object) { return; }
        // const clickPos = this.parsePointer(e);
        const clickPos = new Vector2(e.clientX, e.clientY);

        const indicator = document.querySelector('#indicator');
        indicator.style.left = e.clientX + 'px';
        indicator.style.top = e.clientY + 'px';

        this.raycaster.setFromCamera(clickPos, this.camera);

        console.log('this.target', this.target);
        const intersects = this.raycaster.intersectObjects([this.target], false);			
		console.log('intersects', intersects);

		for (let intersect of intersects) {
			if (this.target === intersect.object) {
                break;
            }
		}

        this.dispatchEvent({
			type: 'pointerDown',
			event: e
		});
    }

    pointerUp(e) {
        //if (this.target !== object) { return; }

        this.dispatchEvent({
			type: 'pointerUp',
			event: e
		});
    }

    parsePointer(e) {	
        var rect = this.canvas.getBoundingClientRect();

        return new Vector2(
            ((e.clientX - rect.x) / rect.width) * 2 - 1,
            ((e.clientY - rect.y) / rect.height) * 2 + 1
        );
    }
}

export { Pointer3D }