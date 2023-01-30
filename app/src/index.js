import "./sass/style.scss";
import * as THREE from 'three';

import { GUI } from './jsm/GUI.js';
import { KeyboardControls } from './jsm/KeyboardControls.js';
import { Player } from './jsm/Player.js';

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
        const bot = new Player(this);
        bot.addEventListener('click', (e) => {
            console.log('bot click', e);

            for (const otherBot of this.bots) {
                otherBot.marker.visible = false;
            }
            
            bot.marker.visible = true;
        });

        bot.object.position.copy(position);
        this.bots.push(bot);
        this.scene.add(bot.object);
    }
}

window.bbb = new BBB();