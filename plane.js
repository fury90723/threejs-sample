import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

let textureUrls = [
    'https://i.imgur.com/wLNDvZV.png', 'https://i.imgur.com/wLNDvZV.png', 'https://i.imgur.com/wLNDvZV.png',
    'https://i.imgur.com/wLNDvZV.png', 'https://i.imgur.com/wLNDvZV.png', 'https://i.imgur.com/wLNDvZV.png'
];

let renderer = null
let camera = null
let scene = null
let controls = null

function renderMap(urls) {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        60, window.innerWidth / window.innerHeight, 1, 100000);

    camera.position.x = 500;
    camera.position.y = 500;
    camera.position.z = -500;

    camera.lookAt(new THREE.Vector3(0, 0, 0))

    let textureLoader = new THREE.TextureLoader();

    let materials =
        urls.map((url) => {
            return textureLoader.load(url);
        }).map((texture) => {
            return new THREE.MeshBasicMaterial({ map: texture })
        });

    //let mesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), materials);
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(25, 100, 150), new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
    //scene.add(mesh);
    plane.rotation.y = 4;
    plane.rotation.x = 2;
    scene.add(plane);

}

function init() {

    renderMap(textureUrls);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    render();
}

function render() {

    requestAnimationFrame(render)
    controls.update();
    renderer.render(scene, camera)
}

init()
