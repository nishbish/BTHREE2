import "./sass/style.scss";
import * as THREE from 'three';

import { AssetManager } from './AssetManager.js';
import { Player } from './Player.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';

class BBB {
    constructor() {
        this.scene = new THREE.Scene();
        this.init();
        
        for (let i=0;i<10;i++) {
            this.addPlayer(new THREE.Vector3(i + i, 0, 0));
        }
    }

    init() {
        this.initLighting();
        this.initCamera();
        this.initRenderer();
        this.initControls();
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

    initControls() {
        this.orbitControlscontrols = new OrbitControls(this.camera, this.renderer.domElement);
    }

    animate() {
        requestAnimationFrame(() => { this.animate(); });
        
        //this.renderer.render( this.scene, this.camera );
        this.effects.composer.render();
    }

    windowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    addPlayer(position = new THREE.Vector3) {
        this.player = new Player();
        this.player.mesh.position.copy(position);
        this.scene.add(this.player.mesh);
    }
}

window.bbb = new BBB();