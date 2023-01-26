import { EventDispatcher } from 'three';

class KeyboardControls extends EventDispatcher {
    constructor() {
        super();

        this.lastKey = null;
        this.keyBuffer = [];
        this.keyBufferTimer;
        this.keyBufferTimerDuration = 1000;

        document.addEventListener('keydown', (event) => { this.onKeyDown(event.key, event.code); }, false);
        document.addEventListener('keyup', (event) => { this.onKeyUp(event.key, event.code); }, false);
    }
    
    onKeyDown(name, code) {
        //if (!document.activeElement || document.activeElement !== document.body) { return; }    //blocks keypresses while using inputs
        
        this.lastKeyCode = name;

        this.dispatchEvent({
            type: 'keyDown',
            name: name,
            code: code,
            lastKey: this.lastKey
        });        
    }

    onKeyUp(name, code) {
        //if (!document.activeElement || document.activeElement !== document.body) { return; }    //blocks keypresses while using inputs

        this.keyBuffer.push(name);

        this.dispatchEvent({
            type: 'keyUp',
            name: name,
            code: code,
            buffer: this.keyBuffer            
        });        

        clearTimeout(this.keyBufferTimer);
        this.keyBufferTimer = setTimeout(() => {
            this.keyBuffer = [];
        }, this.keyBufferTimerDuration);
    }
}

export { KeyboardControls }