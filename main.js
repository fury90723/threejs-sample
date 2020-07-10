import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';

let scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let mixer;
var clock = new THREE.Clock();

camera.position.z = 2;

var mixers = [];

function animate() {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
    stats.update();
}

// load GLTF
const loader = new GLTFLoader();

loader.load(
    'samba.glb',
    (gltf) => {
        // called when the resource is loaded

        // load texture
        var texture = new THREE.TextureLoader().load("texture.png");

        // If texture is used for color information, set colorspace.
        texture.encoding = THREE.sRGBEncoding;

        // UVs use the convention that (0, 0) corresponds to the upper left corner of a texture.
        texture.flipY = false;
        var model = gltf.scene;
        model.traverse((o) => {
            if (o.isMesh) {
                // note: for a multi-material mesh, `o.material` may be an array,
                // in which case you'd need to set `.map` on each value.
                o.material.map = texture;
            }
        });
        mixer = new THREE.AnimationMixer(gltf.scene);
        var action = mixer.clipAction(gltf.animations[0]);
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
