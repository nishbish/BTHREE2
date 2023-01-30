import "./sass/style.scss";
import * as THREE from 'three';

import { GUI } from './jsm/GUI.js';
import { KeyboardControls } from './jsm/KeyboardControls.js';
import { Bot } from './jsm/Bot.js';
import { PointerControls } from './jsm/PointerControls.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';

class BBB {
    constructor() {
        this.scene = new THREE.Scene();
        this.init();
       
        this.gridSize = 50;
        this.grid = new THREE.GridHelper(this.gridSize, this.gridSize);
        this.grid.position.set(0.5, 0, 0.5);
        this.scene.add(this.grid);

        this.bots = [];
    }

    init() {
        this.initLighting();
        this.initCamera();
        this.initRenderer();
        this.initOrbitControls();
        this.initUI();
        this.initKeyboardControls();
        this.initPointerControls();
    }

    initLighting() {
        this.initLighting.ambientLight = new THREE.AmbientLight();
        this.scene.add(this.initLighting.ambientLight);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.z = 5;
    }

    initRenderer() {
        //renderer
        this.renderer = new THREE.WebGLRenderer();
        this.windowResize();
        window.addEventListener('resize', () => { this.windowResize() })
        document.body.appendChild( this.renderer.domElement );

        //composer effects
        this.effects = {
            composer: new EffectComposer( this.renderer ),
            renderPixelatedPass: new RenderPixelatedPass(4, this.scene, this.camera)
        }
        
        this.effects.composer.addPass(this.effects.renderPixelatedPass);
        this.animate();
    }

    initOrbitControls() {
        this.orbitControlscontrols = new OrbitControls(this.camera, this.renderer.domElement);
    }

    initUI() {
        GUI.get('#addBotButton').addEventListener('click', () => { this.addBot(); });
    }

    initKeyboardControls() {
        this.keyboardControls = new KeyboardControls();
        this.keyboardControls.addEventListener('keyDown', (e) => {
            let dir = new THREE.Vector3;

            switch (e.name) {
                case 'ArrowUp':    dir.z = -1;  break;
                case 'ArrowRight': dir.x = 1;  break;
                case 'ArrowDown':  dir.z = 1; break;
                case 'ArrowLeft':  dir.x = -1; break;
            }

            for (const bot of this.bots) {
                bot.move(dir);
            }
        });
    }

    initPointerControls() {
        this.pointerControls = new PointerControls(this.renderer.domElement, this.camera);

        this.pointerControls.addEventListener('click', (e) => {
            this.deselectBots();
            
            if ('bot' in e.intersect.object && e.intersect.object.bot instanceof Bot) {
                e.intersect.object.bot.marker.visible = true;
            }
        });
    }

    animate() {
        requestAnimationFrame(() => { this.animate(); });
        this.effects.composer.render();
    }

    windowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    deselectBots() {
        for (const bot of this.bots) {
            bot.marker.visible = false;
        }
    }

    addBot(position = new THREE.Vector3) {        
        this.deselectBots();

        const bot = new Bot();
        bot.object.position.copy(position);
        this.bots.push(bot);
        this.pointerControls.targets.push(bot.collider);
        this.scene.add(bot.object);
    }
}

window.bbb = new BBB();