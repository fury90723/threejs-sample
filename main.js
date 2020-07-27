import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';

// Make three.js scene
let scene = new THREE.Scene();

//Change color background
scene.background = new THREE.Color( 0xffffff );

// Make camera and change the dimensions
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Make renderer
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

// Append the renderer to the body
document.body.appendChild(renderer.domElement);

let mixer;
let clock = new THREE.Clock();

camera.position.z = 2;

let mixers = [];

// Render
function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
}

// load GLTF
const loader = new GLTFLoader();

loader.load(
    'samba.glb',
    (gltf) => {
        // load texture
        let texture = new THREE.TextureLoader().load("texture.png");

        // If texture is used for color information, set colorspace.
        texture.encoding = THREE.sRGBEncoding;

        // UVs use the convention that (0, 0) corresponds to the upper left corner of a texture.
        texture.flipY = false;
        let model = gltf.scene;
        model.traverse((o) => {
            if (o.isMesh) {
                // note: for a multi-material mesh, `o.material` may be an array,
                // in which case you'd need to set `.map` on each value.
                o.material.map = texture;
            }
        });
        mixer = new THREE.AnimationMixer(gltf.scene);
        let action = mixer.clipAction(gltf.animations[0]);
        action.play();
        scene.add(model);

    },
    (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    },
    (error) => {
        // called when loading has errors
        console.error('An error happened', error);
    },
);

animate();
