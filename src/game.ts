import {Scene} from "three/src/scenes/Scene";
import {Camera} from "three/src/cameras/Camera";
import {Meteor} from "./meteor";
import {LightManager} from "./lightmanager";
import {Vector3} from "three/src/math/Vector3";

export class Game {

    private meteors: Meteor[] = [];
    lightManager: LightManager;

    constructor(private scene: Scene, private camera: Camera, numberOfMeteors: number) {
        this.lightManager = new LightManager(scene);
        this.lightManager.addLights();

        for (let i = 0; i < numberOfMeteors; i++) {
            this.addNewMeteor();
        }
        this.camera.position.z += 5;
    }

    update() {
        this.meteors.forEach(meteor => {
            meteor.update();
            if (meteor.object.position.z > 5) {
                this.resetMeteor(meteor);
            }
        });
    }

    private addNewMeteor() {
        let meteorPosition = new Vector3(this.calcX(), this.calcY(), this.calcZ());
        let meteor = new Meteor();
        this.meteors.push(meteor);
        this.scene.add(meteor.object);
        meteor.setPosition(meteorPosition);
    }

    private resetMeteor(meteor: Meteor) {
        let meteorPosition = new Vector3(this.calcX(), this.calcY(), -1000);
        meteor.setPosition(meteorPosition);
    }

    private calcX = () => Math.random() * 1400 - 700;
    private calcY = () => Math.random() * 700 - 350;
    private calcZ = () => Math.random() * -1000;
}