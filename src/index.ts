import {Scene} from "three/src/scenes/Scene";
import {PerspectiveCamera} from "three/src/cameras/PerspectiveCamera";
import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";
import {Game} from "./game";

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const numberOfMeteors = 100;
const game = new Game(scene, camera, numberOfMeteors);

function animate() {
    requestAnimationFrame(animate);
    game.update();
    renderer.render(scene, camera);
}

animate();