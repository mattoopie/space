import {Scene} from "three/src/scenes/Scene";
import {PerspectiveCamera} from "three/src/cameras/PerspectiveCamera";
import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";
import {Space} from "./space/space";
import './style.css';
import {SettingsHandler, SpaceSettings} from "./settings/settings";

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const settings = new SpaceSettings(
    0xffffff,
    500,
    20,
    0x000000
);
const space = new Space(scene, camera, settings);
const settingsHandler = new SettingsHandler(space, settings);
settingsHandler.setupSettingsHandlers();

function animate() {
    requestAnimationFrame(animate);
    space.update();
    renderer.render(scene, camera);
}

animate();

