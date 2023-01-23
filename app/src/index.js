import "./sass/style.scss";
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class BBB {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
        this.renderer = new THREE.WebGLRenderer();
        document.body.appendChild( this.renderer.domElement );
        this.windowResize();
        window.addEventListener('resize', () => { this.windowResize() })
        
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );
        
        this.camera.position.z = 5;

        this.loop();
    }
    
    windowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    loop() {
        requestAnimationFrame(() => { this.loop(); });

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render( this.scene, this.camera );
    }
}

window.bbb = new BBB();