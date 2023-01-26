import "./sass/style.scss";
import * as THREE from 'three';

import { KeyboardControls } from './jsm/KeyboardControls.js';
import { Player } from './jsm/Player.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';

class BBB {
    constructor() {
        this.scene = new THREE.Scene();
        this.init();
       
        this.gridSize = 20;
        this.grid = new THREE.GridHelper(this.gridSize, this.gridSize);
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
            renderPixelatedPass: new RenderPixelatedPass( 6, this.scene, this.camera )
        }
        
        this.effects.composer.addPass(this.effects.renderPixelatedPass);
        this.animate();
    }

    initOrbitControls() {
        this.orbitControlscontrols = new OrbitControls(this.camera, this.renderer.domElement);
    }

    initUI() {
        this.ui = {
            addBotButton: document.querySelector('#add-bot-button')
        }

        this.ui.addBotButton.addEventListener('click', () => { this.addBot(new THREE.Vector3(0.5, 0.5, 0.5)); });
    }

    initKeyboardControls() {
        this.keyboardControls = new KeyboardControls();
        this.keyboardControls.addEventListener('keyUp', (e) => {
            let dir = new THREE.Vector3;

            switch (e.name) {
                case 'ArrowUp':    dir.z = -1;  break;
                case 'ArrowRight': dir.x = 1;  break;
                case 'ArrowDown':  dir.z = 1; break;
                case 'ArrowLeft':  dir.x = -1; break;
            }

            for (const bot of this.bots) {
                bot.mesh.position.add(dir);
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

    addBot(position = new THREE.Vector3) {
        const bot = new Player();
        bot.mesh.position.copy(position);
        this.bots.push(bot);
        this.scene.add(bot.mesh);
    }
}

window.bbb = new BBB();