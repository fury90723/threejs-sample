import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';

let scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

camera.position.z = 50;

function animate() {
	requestAnimationFrame(animate);
	if (mixers.length > 0) {
		for (var i = 0; i < mixers.length; i++) {
			mixers[i].update(clock.getDelta());
		}
	}
	renderer.render(scene, camera);
}

// load GLTF
// const loader = new GLTFLoader();
// loader.load(
// 	'target.glb',
// 	(gltf) => {
// 		// called when the resource is loaded

// 		scene.add(gltf.scene);
// 	},
// 	(xhr) => {
// 		// called while loading is progressing
// 		console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
// 	},
// 	(error) => {
// 		// called when loading has errors
// 		console.error('An error happened', error);
// 	},
// );

// load FBX
loader.load(
	'samba.fbx',
	function (object) {
		object.mixer = new THREE.AnimationMixer(object);
		mixer.push(object.mixer);
		var action = object.mixer.clipAction(object.animations[0]);
		action.play();
		scene.add(object);
	}
)

animate();
