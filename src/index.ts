import {Scene} from "three/src/scenes/Scene";
import {PerspectiveCamera} from "three/src/cameras/PerspectiveCamera";
import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";
import {Space} from "./space/space";
import './style.css';
import {setupSettingsHandlers, SpaceSettings} from "./settings/settings";

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const settings = new SpaceSettings(
    0xffffff,
    100,
    0x000000
);
const space = new Space(scene, camera, settings);

function animate() {
    requestAnimationFrame(animate);
    space.update();
    renderer.render(scene, camera);
}

animate();
setupSettingsHandlers();

export function getSpace(): Space {
    return space;
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}