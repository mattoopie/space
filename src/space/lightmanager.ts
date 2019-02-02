import {Scene} from "three/src/scenes/Scene";
import {AmbientLight} from "three/src/lights/AmbientLight";
import {HemisphereLight} from "three/src/lights/HemisphereLight";

export class LightManager {

    constructor(private scene: Scene) {
    }

    addLights() {
        const ambientLight = new AmbientLight(0xffffff);
        this.scene.add(ambientLight);
        const hemisphereLight = new HemisphereLight(0x444444, 0x000000);
        this.scene.add(hemisphereLight);
    }
}