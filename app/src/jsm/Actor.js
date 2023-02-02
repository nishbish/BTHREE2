import {
    EventDispatcher,
    Group,
    Mesh,
} from "three";

import { PointerControls } from './PointerControls';

class Actor extends EventDispatcher {
    static pointerControls = null;

    static initPointerControls(canvas, camera) {
        Actor.pointerControls = new PointerControls(canvas, camera);      

        Actor.pointerControls.addEventListener('click', (e) => {
            if (e.intersect.object.parent && 'actor' in e.intersect.object.parent) {
                e.intersect.object.parent.actor.click();
            }
        });
    }
    
    constructor() {
        super();

        this.object = new Group();      //default group
        this.object.actor = this;
        this.collider = new Mesh();     //default collider

        //add to pointer controls
        Actor.pointerControls.targets.push(this.collider);
    }

    click(e) {
        this.dispatchEvent({
            type: 'click',
            actor: this,
            ...e
        });
    }
}

export { Actor }