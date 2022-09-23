import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();

const gradient = textureLoader.load("textures/gradients/3.jpg");
const matcap = textureLoader.load("textures/matcaps/8.png");

const colorDoor = textureLoader.load("textures/door/color.jpg");
const alphaDoor = textureLoader.load("textures/door/alpha.jpg");
const heightDoor = textureLoader.load("textures/door/height.jpg");
const normalDoor = textureLoader.load("textures/door/normal.jpg");
const metalnessDoor = textureLoader.load("textures/door/metalness.jpg");
const roughnessDoor = textureLoader.load("textures/door/roughness.jpg");
const ambientOcclusionDoor = textureLoader.load(
    "textures/door/ambientOcclusion.jpg"
);

const environmentMapTexture = new THREE.CubeTextureLoader().load([
    "textures/environmentMaps/0/px.jpg",
    "textures/environmentMaps/0/nx.jpg",
    "textures/environmentMaps/0/py.jpg",
    "textures/environmentMaps/0/ny.jpg",
    "textures/environmentMaps/0/pz.jpg",
    "textures/environmentMaps/0/nz.jpg",
]);
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */

/*const material = new THREE.MeshBasicMaterial({
    map: colorDoor,
});*/

/*const material = new THREE.MeshNormalMaterial({
    map: colorDoor,
});*/

/*const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap;*/

/*const material = new THREE.MeshDepthMaterial();*/

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
// material.map = colorDoor;
// material.aoMap = ambientOcclusionDoor;
// material.displacementMap = heightDoor;
// material.displacementScale = 0.1;
// material.metalnessMap = metalnessDoor;
// material.roughnessMap = roughnessDoor;
// material.normalMap = normalDoor;

material.envMap = environmentMapTexture;
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    material
);

sphere.position.x = 1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
);

plane.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
    material
);

torus.position.x = -1.5;
scene.add(sphere, plane, torus);

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Fullscreen
 */
window.addEventListener("dblclick", () => {
    const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects position
    sphere.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;
    //plane.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;
    //plane.rotation.x = 0.15 * elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
