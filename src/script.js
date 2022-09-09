import * as THREE from 'three';
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
console.log(gsap)

//Cursor

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width -0.5
    cursor.y = -(event.clientY / sizes.width -0.5) 

    console.log(cursor.x )
})

// Scene
const scene = new THREE.Scene()

// Object

const group = new THREE.Group();

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: '#32a852'})
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: '#88a690'})
)
cube2.position.set(0.5, 1, 0,5)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: '#9788a6'})
)
cube3.position.set(-0.5, 1, 0,5)


group.add(cube1, cube2, cube3);

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1

scene.add(group)

//Scale
mesh.scale.set(0.5, 1, 0.5)

//Rotation
mesh.rotation.x = Math.PI
mesh.rotation.y = Math.PI



// Axes helper
const axesHelprer = new THREE.AxesHelper(4);
scene.add(axesHelprer);

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

camera.lookAt(group.position)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

controls.update()
renderer.render(scene, camera)


// Animate

let time = Date.now();
 const tick = () =>
 {
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    //group.rotation.y += 0.001 * deltaTime;

    // Update camera
    //camera.position.x = Math.sin(cursor.x * Math.PI *2) * 3
    //camera.position.z = Math.cos(cursor.x * Math.PI *2) * 3 
    //camera.position.y = cursor.y * 5

    //camera.lookAt(group.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
 }
 
 tick()